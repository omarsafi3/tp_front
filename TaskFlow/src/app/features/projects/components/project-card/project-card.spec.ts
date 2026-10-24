import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCard } from './project-card';
import { Project } from '../../models/project.model';

describe('ProjectCard', () => {
  let component: ProjectCard;
  let fixture: ComponentFixture<ProjectCard>;

  const mockProject: Project = {
    id: 1,
    name: 'Test Project',
    description: 'Test Description',
    status: 'En cours',
    tasks: [],
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
});
