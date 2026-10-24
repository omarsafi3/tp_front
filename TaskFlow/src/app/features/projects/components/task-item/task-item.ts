import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline-pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    TruncatePipe,
    DeadlinePipe,
    HighlightDirective,
    OverdueDirective,
  ],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  // Entrée obligatoire task avec l'API moderne input()
  readonly task = input.required<Task>();

  getTaskStatusBorderClass(status: TaskStatus): string {
    switch (status) {
      case 'Terminé':
        return 'border-l-4 border-emerald-500 bg-emerald-50/20 text-emerald-900';
      case 'En cours':
        return 'border-l-4 border-blue-500 bg-blue-50/20 text-blue-900';
      case 'En attente':
      default:
        return 'border-l-4 border-amber-500 bg-amber-50/20 text-amber-900';
    }
  }

  getStatusBadgeClass(status: TaskStatus): string {
    switch (status) {
      case 'Terminé':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'En cours':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'En attente':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  }

  getPriorityBadgeClass(priority: TaskPriority): string {
    switch (priority) {
      case 'Haute':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'Moyenne':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Basse':
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  }
}
