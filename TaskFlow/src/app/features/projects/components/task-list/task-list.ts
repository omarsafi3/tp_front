import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../users/models/user.model';
import { Task } from '../../models/task.model';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  private readonly userService = inject(UserService);

  // Partie 6.3 : Input requis entre composants
  readonly tasks = input.required<Task[]>();

  // Partie 2.4 : Entrée showAssignee (true par défaut)
  readonly showAssignee = input<boolean>(true);

  // Liste des utilisateurs pour afficher le nom de l'assigné
  readonly users = signal<User[]>([]);

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  getAssigneeName(assigneeId?: number): string {
    if (!assigneeId) return 'Non assigné';
    const user = this.users().find((u) => u.id === assigneeId);
    return user ? user.name : 'Non assigné';
  }
}
