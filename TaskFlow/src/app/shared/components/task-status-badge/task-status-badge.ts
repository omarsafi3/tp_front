import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { TaskStatus } from '../../../features/projects/models/task.model';

@Component({
  selector: 'app-task-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-status-badge.html',
  styleUrl: './task-status-badge.css',
})
export class TaskStatusBadge {
  /**
   * Statut de la tâche reçu via l'API moderne input()
   */
  readonly status = input.required<TaskStatus | string>();

  /**
   * Classes de couleur de fond et bordure selon le statut
   */
  readonly badgeClass = computed<string>(() => {
    switch (this.status()) {
      case 'Terminé':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'En cours':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'En attente':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  });

  /**
   * Couleur de la pastille indicatrice selon le statut
   */
  readonly dotClass = computed<string>(() => {
    switch (this.status()) {
      case 'Terminé':
        return 'bg-emerald-500';
      case 'En cours':
        return 'bg-blue-500';
      case 'En attente':
      default:
        return 'bg-amber-500';
    }
  });
}
