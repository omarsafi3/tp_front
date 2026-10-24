import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Project, ProjectStatus } from '../../models/project.model';
import { TaskStatus } from '../../models/task.model';
import { TaskDeleteEvent, TaskList, TaskStatusChangeEvent } from '../task-list/task-list';

export interface ProjectTaskStatusChangeEvent {
  projectId: number;
  taskId: number;
  newStatus: TaskStatus;
}

export interface ProjectTaskDeleteEvent {
  projectId: number;
  taskId: number;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, TaskList],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  // Partie 6.2 : Utiliser l’API moderne input.required
  readonly project = input.required<Project>();

  // Input optionnel pour l'état sélectionné
  readonly isSelected = input<boolean>(false);

  // Partie 6.5 : Output pour informer le parent lors de la sélection
  readonly projectSelected = output<Project>();

  // Événement taskStatusChange enrichi avec projectId et transmis au parent
  readonly taskStatusChange = output<ProjectTaskStatusChangeEvent>();

  // Bonus 7.1 : Événement taskDelete enrichi avec projectId et transmis au parent
  readonly taskDelete = output<ProjectTaskDeleteEvent>();

  // Partie 4.3 : Signal computed calculant le nombre de tâches terminées
  readonly completedTasksCount = computed<number>(() => {
    const tasks = this.project().tasks;
    if (!tasks || tasks.length === 0) {
      return 0;
    }
    return tasks.filter((t) => t.status === 'Terminé').length;
  });

  // Partie 4.4 : Signal computed calculant le pourcentage d'avancement à partir de completedTasksCount()
  readonly completionRate = computed<number | null>(() => {
    const total = this.project().tasks?.length ?? 0;
    if (total === 0) {
      return null;
    }
    return this.completedTasksCount() / total;
  });

  // Coût moyen par tâche (budget / nombre de tâches) uniquement si tasks.length > 0
  readonly averageCostPerTask = computed<number | null>(() => {
    const taskCount = this.project().tasks?.length ?? 0;
    const budget = this.project().budget;
    if (taskCount === 0 || budget === undefined) {
      return null;
    }
    return budget / taskCount;
  });

  // Nombre de tâches par priorité pour le pipe keyvalue (Basse, Haute, Moyenne)
  readonly tasksByPriority = computed<Record<string, number>>(() => {
    const counts: Record<string, number> = {
      Basse: 0,
      Haute: 0,
      Moyenne: 0,
    };
    for (const task of this.project().tasks) {
      if (task.priority in counts) {
        counts[task.priority]++;
      }
    }
    return counts;
  });

  /**
   * Accesseur barColor pour la barre de progression :
   * - rouge (#ef4444) sous 34 %
   * - orange (#f59e0b) jusqu’à 66 %
   * - vert (#22c55e) au-delà
   */
  get barColor(): string {
    const rate = (this.completionRate() ?? 0) * 100;
    if (rate < 34) {
      return '#ef4444';
    }
    if (rate <= 66) {
      return '#f59e0b';
    }
    return '#22c55e';
  }

  getPriorityBadgeClass(priority: string): string {
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

  // Partie 6.4 & 6.5 : Méthode appelée au clic sur le bouton Sélectionner
  selectProject(): void {
    this.projectSelected.emit(this.project());
  }

  /**
   * Partie 3.5 & 3.7 : Remontée de l'événement TaskList vers le parent (ProjectList)
   * sans muter directement les données en entrée
   */
  onTaskStatusChange(event: TaskStatusChangeEvent): void {
    this.taskStatusChange.emit({
      projectId: this.project().id,
      taskId: event.taskId,
      newStatus: event.newStatus,
    });
  }

  /**
   * Bonus 7.1 : Remontée de l'événement taskDelete vers ProjectList avec projectId
   */
  onTaskDelete(event: TaskDeleteEvent): void {
    this.taskDelete.emit({
      projectId: this.project().id,
      taskId: event.taskId,
    });
  }

  /**
   * Partie 9 : Différenciation visuelle des statuts
   */
  getStatusBadgeClass(status: ProjectStatus): string {
    switch (status) {
      case 'Terminé':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'En cours':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'En attente':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  }
}
