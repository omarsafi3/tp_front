import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Project, ProjectStatus } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';

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

  // Taux de réalisation calculé dans la classe (tâches terminées / total)
  readonly completionRate = computed<number>(() => {
    const tasks = this.project().tasks;
    if (!tasks || tasks.length === 0) {
      return 0;
    }
    const completedCount = tasks.filter((t) => t.status === 'Terminé').length;
    return completedCount / tasks.length;
  });

  // Coût moyen par tâche (budget / nombre de tâches)
  readonly averageCostPerTask = computed<number>(() => {
    const budget = this.project().budget ?? 0;
    const taskCount = this.project().tasks?.length ?? 0;
    if (taskCount === 0) {
      return 0;
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
