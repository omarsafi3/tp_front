import {
  Directive,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../../features/projects/models/task.model';

@Directive({
  selector: '[appOverdue]',
  standalone: true,
})
export class OverdueDirective implements OnChanges {
  /**
   * Date d'échéance (optionnelle)
   */
  @Input() dueDate?: string | Date | null;

  /**
   * État de la tâche (boolean ou string 'Terminé')
   */
  @Input() done?: boolean | string;

  /**
   * Entrée directe via sélecteur [appOverdue]="task" ou [appOverdue]="dueDate"
   */
  @Input('appOverdue') taskOrDueDate?: Task | string | null;

  /**
   * Statut de la tâche pour rétrocompatibilité
   */
  @Input() status?: string;

  /**
   * Date de référence (par défaut aujourd'hui)
   */
  @Input() referenceDate: Date = new Date();

  /**
   * Indique si la tâche est en retard
   */
  isOverdue = false;

  /**
   * Classes Tailwind border-red-500 et bg-red-50 appliquées avec @HostBinding('class')
   */
  @HostBinding('class')
  get overdueClasses(): string {
    return this.isOverdue ? 'border-red-500 bg-red-50 is-overdue' : '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateOverdueStatus();
  }

  private updateOverdueStatus(): void {
    let effectiveDueDate: string | Date | undefined = this.dueDate ?? undefined;
    let isTaskDone = false;

    // Évaluation de l'état "done"
    if (typeof this.done === 'boolean') {
      isTaskDone = this.done;
    } else if (typeof this.done === 'string') {
      isTaskDone = this.done === 'Terminé';
    } else if (this.status) {
      isTaskDone = this.status === 'Terminé';
    }

    // Support si un objet Task est transmis
    if (
      typeof this.taskOrDueDate === 'object' &&
      this.taskOrDueDate !== null &&
      'id' in this.taskOrDueDate
    ) {
      const task = this.taskOrDueDate as Task;
      if (!effectiveDueDate) {
        effectiveDueDate = task.dueDate;
      }
      if (this.done === undefined && this.status === undefined) {
        isTaskDone = task.status === 'Terminé';
      }
    } else if (typeof this.taskOrDueDate === 'string' && !effectiveDueDate) {
      effectiveDueDate = this.taskOrDueDate;
    }

    // Si la tâche est terminée : aucune classe et aucune erreur
    if (isTaskDone) {
      this.isOverdue = false;
      return;
    }

    // Si la date est absente : aucune classe et aucune erreur
    if (!effectiveDueDate) {
      this.isOverdue = false;
      return;
    }

    let targetDate: Date;

    if (effectiveDueDate instanceof Date) {
      if (isNaN(effectiveDueDate.getTime())) {
        this.isOverdue = false;
        return;
      }
      targetDate = new Date(
        effectiveDueDate.getFullYear(),
        effectiveDueDate.getMonth(),
        effectiveDueDate.getDate()
      );
    } else {
      const trimmed = effectiveDueDate.trim();
      if (!trimmed) {
        this.isOverdue = false;
        return;
      }

      if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
        const [year, month, day] = trimmed.split('T')[0].split('-').map(Number);
        targetDate = new Date(year, month - 1, day);
      } else {
        const parsed = new Date(trimmed);
        if (isNaN(parsed.getTime())) {
          this.isOverdue = false;
          return;
        }
        targetDate = new Date(
          parsed.getFullYear(),
          parsed.getMonth(),
          parsed.getDate()
        );
      }
    }

    const ref = new Date(
      this.referenceDate.getFullYear(),
      this.referenceDate.getMonth(),
      this.referenceDate.getDate()
    );

    // En retard si l'échéance est strictement antérieure à la date de référence
    this.isOverdue = targetDate.getTime() < ref.getTime();
  }
}
