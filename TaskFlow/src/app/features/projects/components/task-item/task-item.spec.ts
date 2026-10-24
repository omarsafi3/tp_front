import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskItem } from './task-item';
import { Task } from '../../models/task.model';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

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

  it('should display "▲" for priority Haute with rose badge classes', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('▲');
    expect(compiled.textContent).toContain('Haute');
    expect(component.getPriorityBadgeClass('Haute')).toContain('bg-rose-100');
  });

  it('should display "●" for priority Moyenne with orange badge classes', async () => {
    fixture.componentRef.setInput('task', {
      ...mockTask,
      priority: 'Moyenne',
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('●');
    expect(compiled.textContent).toContain('Moyenne');
    expect(component.getPriorityBadgeClass('Moyenne')).toContain('bg-orange-100');
  });

  it('should display "▼" for priority Basse with slate badge classes', async () => {
    fixture.componentRef.setInput('task', {
      ...mockTask,
      priority: 'Basse',
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('▼');
    expect(compiled.textContent).toContain('Basse');
    expect(component.getPriorityBadgeClass('Basse')).toContain('bg-slate-100');
  });

  it('should return appropriate Tailwind status classes', () => {
    expect(component.getTaskStatusBorderClass('Terminé')).toContain('border-l-emerald-500');
    expect(component.getTaskStatusBorderClass('En cours')).toContain('border-l-blue-500');
    expect(component.getTaskStatusBorderClass('En attente')).toContain('border-l-amber-500');

    expect(component.getStatusBadgeClass('Terminé')).toContain('bg-emerald-100');
    expect(component.getStatusBadgeClass('En cours')).toContain('bg-blue-100');
    expect(component.getStatusBadgeClass('En attente')).toContain('bg-amber-100');
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

  it('should correctly cycle task status: En attente -> En cours -> Terminé -> En attente', () => {
    expect(component.getNextStatus('En attente')).toBe('En cours');
    expect(component.getNextStatus('En cours')).toBe('Terminé');
    expect(component.getNextStatus('Terminé')).toBe('En attente');
  });

  it('should emit taskStatusChange event when clicking on status button', () => {
    let emittedStatus: string | null = null;
    component.taskStatusChange.subscribe((status) => {
      emittedStatus = status;
    });

    // mockTask status is 'En cours', next should be 'Terminé'
    fixture.detectChanges();
    const statusBtn = fixture.debugElement.query(By.css('.task-status-btn'));
    expect(statusBtn).toBeTruthy();

    statusBtn.nativeElement.click();
    expect(emittedStatus).toBe('Terminé');
  });

  it('should display full description tooltip on hover over truncated description', () => {
    fixture.detectChanges();
    const descEl = fixture.debugElement.query(By.directive(TooltipDirective));
    expect(descEl).toBeTruthy();

    descEl.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    const bubble = (descEl.nativeElement as HTMLElement).querySelector('.app-tooltip-bubble');
    expect(bubble).toBeTruthy();
    expect(bubble?.textContent).toBe(mockTask.description!);

    descEl.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    expect((descEl.nativeElement as HTMLElement).querySelector('.app-tooltip-bubble')).toBeNull();
  });

  it('should display assigneeName when showAssignee is true and handle unassigned case', async () => {
    fixture.componentRef.setInput('assigneeName', 'Alice Dupont');
    fixture.detectChanges();
    await fixture.whenStable();

    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Alice Dupont');

    fixture.componentRef.setInput('assigneeName', 'Non assigné');
    fixture.detectChanges();
    await fixture.whenStable();

    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Non assigné');
  });

  it('should return appropriate ngStyle progress styles based on status', () => {
    expect(component.getStatusProgressStyle()).toEqual({
      width: '55%',
      backgroundColor: '#3b82f6',
    });

    fixture.componentRef.setInput('task', {
      ...mockTask,
      status: 'Terminé',
    });
    expect(component.getStatusProgressStyle()).toEqual({
      width: '100%',
      backgroundColor: '#10b981',
    });

    fixture.componentRef.setInput('task', {
      ...mockTask,
      status: 'En attente',
    });
    expect(component.getStatusProgressStyle()).toEqual({
      width: '15%',
      backgroundColor: '#f59e0b',
    });
  });

  it('should format assignee initials using initials pipe', async () => {
    fixture.componentRef.setInput('assigneeName', 'Amira Ben Salah');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('AB');
  });
});
