import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../../projects/models/task.model';

@Component({
  selector: 'app-user-project-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-project-group.html',
  styleUrl: './user-project-group.css',
})
export class UserProjectGroup {
  readonly projectName = input.required<string>();
  readonly tasks = input.required<Task[]>();

  getPriorityBadgeClass(priority: TaskPriority): string {
    switch (priority) {
      case 'Haute':
        return 'bg-rose-50 text-rose-700 border-rose-200/60';
      case 'Moyenne':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'Basse':
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200/60';
    }
  }

  getStatusBadgeClass(status: TaskStatus): string {
    switch (status) {
      case 'Terminé':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'En cours':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'En attente':
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200/60';
    }
  }
}
