import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Project } from '../../../projects/models/project.model';
import { Task } from '../../../projects/models/task.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  // Entrées via l'API moderne input
  readonly user = input.required<User>();
  readonly projects = input<Project[]>([]);
  readonly isSelected = input<boolean>(false);

  // Sortie lors de la sélection d'un utilisateur
  readonly userSelected = output<User>();

  // Tâches assignées à cet utilisateur issues de tous les projets
  readonly userTasks = computed<Task[]>(() => {
    const currentUserId = this.user().id;
    const allProjects = this.projects();
    return allProjects.flatMap((p) =>
      p.tasks.filter((t) => t.assigneeId === currentUserId)
    );
  });

  // Statistiques des tâches de l'utilisateur
  readonly completedTasksCount = computed(
    () => this.userTasks().filter((t) => t.status === 'Terminé').length
  );
  readonly inProgressTasksCount = computed(
    () => this.userTasks().filter((t) => t.status === 'En cours').length
  );
  readonly pendingTasksCount = computed(
    () => this.userTasks().filter((t) => t.status === 'En attente').length
  );

  selectUser(): void {
    this.userSelected.emit(this.user());
  }
}
