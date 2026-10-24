import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCard, ProjectTaskStatusChangeEvent } from './project-card';
import { Project } from '../../models/project.model';

describe('ProjectCard', () => {
  let component: ProjectCard;
  let fixture: ComponentFixture<ProjectCard>;

  const mockProject: Project = {
    id: 42,
    name: 'Test Project',
    description: 'Test Description',
    status: 'En cours',
    tasks: [
      {
        id: 101,
        title: 'Tâche test 1',
        priority: 'Haute',
        status: 'En attente',
      },
      {
        id: 102,
        title: 'Tâche test 2',
        priority: 'Moyenne',
        status: 'Terminé',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', mockProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute completedTasksCount and completionRate accurately', () => {
    expect(component.completedTasksCount()).toBe(1);
    expect(component.completionRate()).toBe(0.5); // 1 / 2 = 50%
  });

  it('should update completedTasksCount and completionRate immediately when project tasks change', async () => {
    fixture.componentRef.setInput('project', {
      ...mockProject,
      tasks: [
        {
          id: 101,
          title: 'Tâche test 1',
          priority: 'Haute',
          status: 'Terminé',
        },
        {
          id: 102,
          title: 'Tâche test 2',
          priority: 'Moyenne',
          status: 'Terminé',
        },
      ],
    });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.completedTasksCount()).toBe(2);
    expect(component.completionRate()).toBe(1); // 2 / 2 = 100%
  });

  it('should display completed tasks count in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('1/2 terminées');
  });

  it('should emit taskStatusChange with projectId without mutating input project', () => {
    let emitted: ProjectTaskStatusChangeEvent | null = null;
    component.taskStatusChange.subscribe((event) => {
      emitted = event;
    });

    component.onTaskStatusChange({ taskId: 101, newStatus: 'En cours' });

    expect(emitted).toEqual({
      projectId: 42,
      taskId: 101,
      newStatus: 'En cours',
    });

    // Verify input data was NOT mutated
    expect(component.project().tasks[0].status).toBe('En attente');
  });

  it('should emit projectSelected when selectProject is called', () => {
    let selected: Project | null = null;
    component.projectSelected.subscribe((proj) => {
      selected = proj;
    });

    component.selectProject();
    expect(selected).toEqual(mockProject);
  });

  it('should emit taskDelete with projectId when task deletion is triggered', () => {
    let deleteEvent: { projectId: number; taskId: number } | null = null;
    component.taskDelete.subscribe((ev) => {
      deleteEvent = ev;
    });

    component.onTaskDelete({ taskId: 101 });
    expect(deleteEvent).toEqual({
      projectId: 42,
      taskId: 101,
    });
  });
});
