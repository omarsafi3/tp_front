import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverdueDirective } from './overdue.directive';
import { Task } from '../../features/projects/models/task.model';

@Component({
  standalone: true,
  imports: [OverdueDirective],
  template: `
    <div id="task-overdue" [appOverdue]="overdueTask" [referenceDate]="today">Tâche en retard</div>
    <div id="task-completed" [appOverdue]="completedPastTask" [referenceDate]="today">Tâche passée mais terminée</div>
    <div id="task-future" [appOverdue]="futureTask" [referenceDate]="today">Tâche future</div>
    <div id="task-no-date" [appOverdue]="noDueDateTask" [referenceDate]="today">Tâche sans date</div>
    <div id="task-inputs" [appOverdue] [dueDate]="'2026-10-01'" [done]="false" [referenceDate]="today">Tâche avec inputs dueDate et done</div>
    <div id="task-done-inputs" [appOverdue] [dueDate]="'2026-10-01'" [done]="true" [referenceDate]="today">Tâche avec done true</div>
  `,
})
class TestHostComponent {
  today = new Date(2026, 9, 20); // 20 Octobre 2026

  overdueTask: Task = {
    id: 3,
    title: 'Formulaire de contact',
    priority: 'Moyenne',
    status: 'En cours',
    dueDate: '2026-10-02', // Passé par rapport au 20 Octobre
  };

  completedPastTask: Task = {
    id: 1,
    title: 'Maquettes',
    priority: 'Haute',
    status: 'Terminé',
    dueDate: '2026-09-10', // Passé mais terminée
  };

  futureTask: Task = {
    id: 5,
    title: 'Tests',
    priority: 'Haute',
    status: 'En attente',
    dueDate: '2026-11-15', // Futur
  };

  noDueDateTask: Task = {
    id: 9,
    title: 'Notifications',
    priority: 'Basse',
    status: 'En attente',
  };
}

describe('OverdueDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, OverdueDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should flag an unfinished past task as overdue with Tailwind classes border-red-500 and bg-red-50', () => {
    const el = fixture.debugElement.query(By.css('#task-overdue'));
    expect(el.nativeElement.classList.contains('is-overdue')).toBe(true);
    expect(el.nativeElement.classList.contains('border-red-500')).toBe(true);
    expect(el.nativeElement.classList.contains('bg-red-50')).toBe(true);
  });

  it('should NOT flag a completed past task as overdue', () => {
    const el = fixture.debugElement.query(By.css('#task-completed'));
    expect(el.nativeElement.classList.contains('is-overdue')).toBe(false);
    expect(el.nativeElement.classList.contains('border-red-500')).toBe(false);
    expect(el.nativeElement.classList.contains('bg-red-50')).toBe(false);
  });

  it('should NOT flag a future task as overdue', () => {
    const el = fixture.debugElement.query(By.css('#task-future'));
    expect(el.nativeElement.classList.contains('is-overdue')).toBe(false);
  });

  it('should NOT flag a task without due date as overdue', () => {
    const el = fixture.debugElement.query(By.css('#task-no-date'));
    expect(el.nativeElement.classList.contains('is-overdue')).toBe(false);
  });

  it('should support separate dueDate and done inputs', () => {
    const overdueEl = fixture.debugElement.query(By.css('#task-inputs'));
    expect(overdueEl.nativeElement.classList.contains('border-red-500')).toBe(true);
    expect(overdueEl.nativeElement.classList.contains('bg-red-50')).toBe(true);

    const doneEl = fixture.debugElement.query(By.css('#task-done-inputs'));
    expect(doneEl.nativeElement.classList.contains('border-red-500')).toBe(false);
    expect(doneEl.nativeElement.classList.contains('bg-red-50')).toBe(false);
  });
});
