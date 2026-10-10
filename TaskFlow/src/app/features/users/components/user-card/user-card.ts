import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Project } from '../../../projects/models/project.model';
import { Task } from '../../../projects/models/task.model';
import { User } from '../../models/user.model';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { UserProjectGroup } from '../user-project-group/user-project-group';

export interface UserProjectGroupData {
  projectId: number;
  projectName: string;
  tasks: Task[];
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, UserProjectGroup, EmptyState],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  readonly user = input.required<User>();
  readonly projects = input<Project[]>([]);
  readonly isSelected = input<boolean>(false);

  readonly userSelected = output<User>();

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
}
