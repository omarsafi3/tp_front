import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline-pipe';
import { InitialsPipe } from '../../../../shared/pipes/initials-pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { TaskStatusBadge } from '../../../../shared/components/task-status-badge/task-status-badge';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    TruncatePipe,
    DeadlinePipe,
    InitialsPipe,
    HighlightDirective,
    OverdueDirective,
    TooltipDirective,
    TaskStatusBadge,
  ],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  // Entrée obligatoire task avec l'API moderne input()
  readonly task = input.required<Task>();

  // Entrée optionnelle pour afficher ou masquer l'assigné (Partie 2.4 & 2.5)
  readonly showAssignee = input<boolean>(true);

  // Nom de l'assigné passé depuis le parent (Partie 5.2 : pas d'appel de service dans TaskItem)
  readonly assigneeName = input<string>();

  // Événement taskStatusChange déclaré avec l'API moderne output()
  readonly taskStatusChange = output<TaskStatus>();

  // Bonus 7.1 : Événement taskDelete émis lors du clic sur le bouton Supprimer
  readonly taskDelete = output<number>();

  readonly resolvedAssigneeName = computed<string>(() => {
    const provided = this.assigneeName()?.trim();
    return provided ? provided : 'Non assigné';
  });

  /**
   * Fait évoluer le statut selon le cycle :
   * En attente -> En cours -> Terminé -> En attente
   */
  getNextStatus(current: TaskStatus): TaskStatus {
    switch (current) {
      case 'En attente':
        return 'En cours';
      case 'En cours':
        return 'Terminé';
      case 'Terminé':
      default:
        return 'En attente';
    }
  }

  /**
   * Méthode appelée au clic sur le bouton de statut
   */
  changeStatus(): void {
    const nextStatus = this.getNextStatus(this.task().status);
    this.taskStatusChange.emit(nextStatus);
  }

  /**
   * Bonus 7.1 : Méthode appelée au clic sur le bouton Supprimer
   */
  deleteTask(): void {
    this.taskDelete.emit(this.task().id);
  }

  /**
   * Classes Tailwind pour la bordure latérale selon le statut
   */
  getTaskStatusBorderClass(status: TaskStatus): string {
    switch (status) {
      case 'Terminé':
        return 'border-l-4 border-l-emerald-500';
      case 'En cours':
        return 'border-l-4 border-l-blue-500';
      case 'En attente':
      default:
        return 'border-l-4 border-l-amber-500';
    }
  }

  /**
   * Classes Tailwind pour le badge de statut
   */
  getStatusBadgeClass(status: TaskStatus): string {
    switch (status) {
      case 'Terminé':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200';
      case 'En cours':
        return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
      case 'En attente':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200';
    }
  }

  /**
   * Classes Tailwind pour le badge de priorité
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

  /**
   * Partie 6.3 : Utilisation de ngStyle pour afficher une indication visuelle de l'avancement
   */
  getStatusProgressStyle(): { width: string; backgroundColor: string } {
    switch (this.task().status) {
      case 'Terminé':
        return { width: '100%', backgroundColor: '#10b981' };
      case 'En cours':
        return { width: '55%', backgroundColor: '#3b82f6' };
      case 'En attente':
      default:
        return { width: '15%', backgroundColor: '#f59e0b' };
    }
  }
}
