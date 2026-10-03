import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  // Partie 6.3 : Input requis entre composants
  readonly tasks = input.required<Task[]>();

  /**
   * Retourne la classe de bordure latérale et de fond selon le statut (Partie 9)
   */
  getTaskStatusBorderClass(status: TaskStatus): string {
    switch (status) {
      case 'Terminé':
        return 'border-l-4 border-emerald-500 bg-emerald-50/40 text-emerald-900';
      case 'En cours':
        return 'border-l-4 border-blue-500 bg-blue-50/40 text-blue-900';
      case 'En attente':
      default:
        return 'border-l-4 border-amber-500 bg-amber-50/40 text-amber-900';
    }
  }

  /**
   * Retourne la classe du badge de statut
   */
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

  /**
   * Retourne la classe du badge de priorité
   */
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
