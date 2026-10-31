import { ComponentFixture, TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ProjectService } from '../../../../core/services/project.service';
import { UserList } from './user-list';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;
  let projectService: ProjectService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserList],
    }).compileComponents();

    projectService = TestBed.inject(ProjectService);
    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update task status immutably and sync with ProjectService from user view', async () => {
    component.onTaskStatusChange({
      projectId: 1,
      taskId: 3,
      newStatus: 'Terminé',
    });

    const project1 = component.projects().find((p) => p.id === 1);
    expect(project1?.tasks.find((t) => t.id === 3)?.status).toBe('Terminé');

    const synced = await firstValueFrom(projectService.getProjects());
    expect(synced.find((p) => p.id === 1)?.tasks.find((t) => t.id === 3)?.status).toBe('Terminé');
  });

  it('should delete task immutably and sync with ProjectService from user view', async () => {
    const initialCount = component.projects().find((p) => p.id === 2)!.tasks.length;
    component.onTaskDelete({
      projectId: 2,
      taskId: 8,
    });

    const project2 = component.projects().find((p) => p.id === 2)!;
    expect(project2.tasks.length).toBe(initialCount - 1);
    expect(project2.tasks.some((t) => t.id === 8)).toBe(false);
  });
});
