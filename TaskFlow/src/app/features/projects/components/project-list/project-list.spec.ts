import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ProjectList } from './project-list';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../models/project.model';
import { ProjectCard } from '../project-card/project-card';

describe('ProjectList', () => {
  let component: ProjectList;
  let fixture: ComponentFixture<ProjectList>;

  const initialProjects: Project[] = [
    {
      id: 1,
      name: 'Projet Alpha',
      description: 'Description Alpha',
      status: 'En cours',
      tasks: [
        {
          id: 10,
          title: 'Tâche Alpha 1',
          priority: 'Haute',
          status: 'En attente',
        },
        {
          id: 11,
          title: 'Tâche Alpha 2',
          priority: 'Basse',
          status: 'En cours',
        },
      ],
    },
    {
      id: 2,
      name: 'Projet Beta',
      description: 'Description Beta',
      status: 'En attente',
      tasks: [
        {
          id: 20,
          title: 'Tâche Beta 1',
          priority: 'Moyenne',
          status: 'En attente',
        },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectList],
      providers: [
        {
          provide: ProjectService,
          useValue: {
            getProjects: () => of(initialProjects),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the relevant project and task status immutably on taskStatusChange', () => {
    component.onTaskStatusChange({
      projectId: 1,
      taskId: 10,
      newStatus: 'En cours',
    });

    const updatedProjectAlpha = component.projects().find((p) => p.id === 1);
    expect(updatedProjectAlpha).toBeDefined();

    const updatedTask = updatedProjectAlpha!.tasks.find((t) => t.id === 10);
    expect(updatedTask?.status).toBe('En cours');

    // Other task and other project must remain untouched
    const untouchedTask = updatedProjectAlpha!.tasks.find((t) => t.id === 11);
    expect(untouchedTask?.status).toBe('En cours');

    const projectBeta = component.projects().find((p) => p.id === 2);
    expect(projectBeta?.tasks[0].status).toBe('En attente');
  });

  it('should update selectedProject if the modified project is currently selected', () => {
    component.onProjectSelected(initialProjects[0]);
    expect(component.selectedProject()?.id).toBe(1);

    component.onTaskStatusChange({
      projectId: 1,
      taskId: 10,
      newStatus: 'Terminé',
    });

    expect(component.selectedProject()?.tasks.find((t) => t.id === 10)?.status).toBe('Terminé');
  });

  it('should filter projects based on searchTerm and display only matching project cards', async () => {
    component.searchTerm.set('Beta');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.filteredProjects().length).toBe(1);
    expect(component.filteredProjects()[0].name).toBe('Projet Beta');

    const projectCards = fixture.debugElement.queryAll(By.directive(ProjectCard));
    expect(projectCards.length).toBe(1);
    expect(projectCards[0].componentInstance.project().name).toBe('Projet Beta');
  });

  it('should remove a task from the specified project immutably on taskDelete', () => {
    component.onTaskDelete({
      projectId: 1,
      taskId: 10,
    });

    const projectAlpha = component.projects().find((p) => p.id === 1);
    expect(projectAlpha?.tasks.some((t) => t.id === 10)).toBe(false);
    expect(projectAlpha?.tasks.length).toBe(1);
    expect(projectAlpha?.tasks[0].id).toBe(11);

    // Other projects remain untouched
    const projectBeta = component.projects().find((p) => p.id === 2);
    expect(projectBeta?.tasks.length).toBe(1);
  });
});
