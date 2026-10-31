import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import {
  ProjectTaskDeleteEvent,
  ProjectTaskStatusChangeEvent,
} from '../../../projects/components/project-card/project-card';
import { Project } from '../../../projects/models/project.model';
import { Task } from '../../../projects/models/task.model';
import { User } from '../../models/user.model';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { InitialsPipe } from '../../../../shared/pipes/initials-pipe';
import { UserProjectGroup } from '../user-project-group/user-project-group';

export interface UserProjectGroupData {
  projectId: number;
  projectName: string;
  tasks: Task[];
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, UserProjectGroup, EmptyState, InitialsPipe],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  readonly user = input.required<User>();
  readonly projects = input<Project[]>([]);
  readonly isSelected = input<boolean>(false);

  readonly userSelected = output<User>();
  readonly taskStatusChange = output<ProjectTaskStatusChangeEvent>();
  readonly taskDelete = output<ProjectTaskDeleteEvent>();

  // Objet de correspondance rôle -> couleur pour la pastille d'initiales
  readonly roleColors: Record<string, string> = {
    'Développeur': '#4f46e5', // Indigo
    'Développeur Fullstack': '#0284c7', // Bleu ciel / Océan
    'UI/UX Designer': '#db2777', // Rose fuchsia
    'Chef de projet': '#7c3aed', // Violet
  };

  /**
   * Couleur de fond de la pastille d'initiales selon le rôle de l'utilisateur
   */
  get avatarBgColor(): string {
    return this.roleColors[this.user().role] ?? '#64748b';
  }

  // Regroupement des tâches assignées par projet
  readonly projectGroups = computed<UserProjectGroupData[]>(() => {
    const currentUserId = this.user().id;
    const allProjects = this.projects();
    const groups: UserProjectGroupData[] = [];

    for (const project of allProjects) {
      const userTasksInProject = project.tasks.filter(
        (task) => task.assigneeId === currentUserId
      );
      if (userTasksInProject.length > 0) {
        groups.push({
          projectId: project.id,
          projectName: project.name,
          tasks: userTasksInProject,
        });
      }
    }

    return groups;
  });

  // Ensemble des tâches de l'utilisateur
  readonly allUserTasks = computed<Task[]>(() =>
    this.projectGroups().flatMap((group) => group.tasks)
  );

  // Trois compteurs demandés : À faire (= En attente), En cours, Terminées
  readonly pendingCount = computed(
    () => this.allUserTasks().filter((t) => t.status === 'En attente').length
  );
  readonly inProgressCount = computed(
    () => this.allUserTasks().filter((t) => t.status === 'En cours').length
  );
  readonly completedCount = computed(
    () => this.allUserTasks().filter((t) => t.status === 'Terminé').length
  );

  selectUser(): void {
    this.userSelected.emit(this.user());
  }

  onTaskStatusChange(event: ProjectTaskStatusChangeEvent): void {
    this.taskStatusChange.emit(event);
  }

  onTaskDelete(event: ProjectTaskDeleteEvent): void {
    this.taskDelete.emit(event);
  }
}
