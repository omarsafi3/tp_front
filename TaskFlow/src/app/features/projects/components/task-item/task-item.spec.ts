import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  it('should display "▲" for priority Haute', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('▲');
    expect(compiled.textContent).toContain('Haute');
  });

  it('should display "●" for priority Moyenne', async () => {
    fixture.componentRef.setInput('task', {
      ...mockTask,
      priority: 'Moyenne',
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('●');
    expect(compiled.textContent).toContain('Moyenne');
  });

  it('should display "▼" for priority Basse', async () => {
    fixture.componentRef.setInput('task', {
      ...mockTask,
      priority: 'Basse',
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('▼');
    expect(compiled.textContent).toContain('Basse');
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

  it('should NOT flag a completed task as overdue even if dueDate is past', async () => {
    fixture.componentRef.setInput('task', {
      id: 1,
      title: 'Tâche terminée passée',
      priority: 'Haute',
      status: 'Terminé',
      dueDate: '2026-09-01',
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const mainEl = fixture.debugElement.query(By.css('.task-item'));
    expect(mainEl.nativeElement.classList.contains('is-overdue')).toBe(false);
  });

  it('should apply highlight directive on hover', () => {
    const mainEl = fixture.debugElement.query(By.css('.task-item'));
    const initialBg = (mainEl.nativeElement as HTMLElement).style.backgroundColor;

    mainEl.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    expect((mainEl.nativeElement as HTMLElement).style.backgroundColor).toBe('rgb(241, 245, 249)');

    mainEl.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    expect((mainEl.nativeElement as HTMLElement).style.backgroundColor).toBe(initialBg);
  });
});
