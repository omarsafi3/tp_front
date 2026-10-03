import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
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

  // Partie 6.5 : Output pour informer le parent lors de la sélection
  readonly projectSelected = output<Project>();

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
