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
        title: 'Tâche test',
        priority: 'Haute',
        status: 'En attente',
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
});
