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
    description: 'Une description très longue qui va dépasser la limite de quarante caractères pour le test de troncature.',
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

  it('should format due date with date pipe and deadline pipe', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('30/10/2026');
  });

  it('should truncate long description using truncate pipe', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('…');
  });

  it('should handle task without dueDate and description safely', async () => {
    fixture.componentRef.setInput('task', {
      id: 2,
      title: 'Tâche simple',
      priority: 'Basse',
      status: 'En attente',
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Aucune échéance');
  });
});
