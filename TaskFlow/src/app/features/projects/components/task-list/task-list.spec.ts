import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskList, TaskStatusChangeEvent } from './task-list';
import { TaskItem } from '../task-item/task-item';
import { Task } from '../../models/task.model';

describe('TaskList', () => {
  let component: TaskList;
  let fixture: ComponentFixture<TaskList>;

  const mockTasks: Task[] = [
    {
      id: 1,
      title: 'Tâche 1',
      priority: 'Haute',
      status: 'Terminé',
      assigneeId: 1,
      dueDate: '2026-10-30',
    },
    {
      id: 2,
      title: 'Tâche 2',
      priority: 'Moyenne',
      status: 'En cours',
      assigneeId: 2,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskList],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskList);
    fixture.componentRef.setInput('tasks', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Aucune tâche" when tasks array is empty', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Aucune tâche');
  });

  it('should render TaskItem components for each task with [task] property binding', async () => {
    fixture.componentRef.setInput('tasks', mockTasks);
    fixture.detectChanges();
    await fixture.whenStable();

    const taskItems = fixture.debugElement.queryAll(By.directive(TaskItem));
    expect(taskItems.length).toBe(2);
    expect(taskItems[0].componentInstance.task().id).toBe(1);
    expect(taskItems[1].componentInstance.task().id).toBe(2);
  });

  it('should pass showAssignee to TaskItem', async () => {
    fixture.componentRef.setInput('tasks', mockTasks);
    fixture.componentRef.setInput('showAssignee', false);
    fixture.detectChanges();
    await fixture.whenStable();

    const taskItems = fixture.debugElement.queryAll(By.directive(TaskItem));
    expect(taskItems[0].componentInstance.showAssignee()).toBe(false);
  });

  it('should emit taskStatusChange when child TaskItem triggers status change', async () => {
    fixture.componentRef.setInput('tasks', mockTasks);
    fixture.detectChanges();
    await fixture.whenStable();

    let emittedEvent: TaskStatusChangeEvent | null = null;
    component.taskStatusChange.subscribe((event) => {
      emittedEvent = event;
    });

    const taskItems = fixture.debugElement.queryAll(By.directive(TaskItem));
    const firstTaskItem: TaskItem = taskItems[0].componentInstance;

    // Simulate taskStatusChange output from first TaskItem
    firstTaskItem.taskStatusChange.emit('En attente');

    expect(emittedEvent).toEqual({
      taskId: 1,
      newStatus: 'En attente',
    });
  });

  it('should return assignee name for assigned tasks and "Non assigné" for unassigned tasks', () => {
    expect(component.getAssigneeName(1)).toBe('Amira Ben Salah');
    expect(component.getAssigneeName(undefined)).toBe('Non assigné');
    expect(component.getAssigneeName(9999)).toBe('Non assigné');
  });
});
