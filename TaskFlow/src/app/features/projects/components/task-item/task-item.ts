import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline-pipe';
import { InitialsPipe } from '../../../../shared/pipes/initials-pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../users/models/user.model';

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
  ],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem implements OnInit {
  private readonly userService = inject(UserService, { optional: true });

  // Entrée obligatoire task avec l'API moderne input()
  readonly task = input.required<Task>();

  // Entrée optionnelle pour afficher ou masquer l'assigné (Partie 2.4 & 2.5)
  readonly showAssignee = input<boolean>(true);

  // Nom de l'assigné passé depuis le parent
  readonly assigneeName = input<string>();

  // Événement taskStatusChange déclaré avec l'API moderne output()
  readonly taskStatusChange = output<TaskStatus>();

  // Liste des utilisateurs pour résolution si non transmis
  readonly users = signal<User[]>([]);

  ngOnInit(): void {
    if (this.userService) {
      this.userService.getUsers().subscribe((users) => {
        this.users.set(users);
      });
    }
  }

  readonly resolvedAssigneeName = computed<string>(() => {
    if (this.assigneeName()) {
      return this.assigneeName()!;
    }
    const assigneeId = this.task().assigneeId;
    if (!assigneeId) return 'Non assigné';
    const found = this.users().find((u) => u.id === assigneeId);
    return found ? found.name : 'Non assigné';
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
   * Classes Tailwind pour la bordure latérale et le fond selon le statut
   */
  getTaskStatusBorderClass(status: TaskStatus): string {
    switch (status) {
      case 'Terminé':
        return 'border-l-4 border-l-emerald-500 bg-emerald-50/25';
      case 'En cours':
        return 'border-l-4 border-l-blue-500 bg-blue-50/25';
      case 'En attente':
      default:
        return 'border-l-4 border-l-amber-500 bg-amber-50/25';
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
