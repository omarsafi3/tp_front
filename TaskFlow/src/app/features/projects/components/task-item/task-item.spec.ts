import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItem } from './task-item';
import { Task } from '../../models/task.model';

describe('TaskItem', () => {
  let component: TaskItem;
  let fixture: ComponentFixture<TaskItem>;

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    priority: 'Haute',
    status: 'En cours',
    assigneeId: 1,
    dueDate: '2026-10-30',
    description: 'Description de test',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItem);
    fixture.componentRef.setInput('task', mockTask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
