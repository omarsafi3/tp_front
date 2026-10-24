import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../../features/projects/models/task.model';

@Directive({
  selector: '[appOverdue]',
  standalone: true,
})
export class OverdueDirective implements OnChanges {
  /**
   * Reçoit soit une tâche complète, soit une date d'échéance sous forme de chaîne.
   */
  @Input('appOverdue') taskOrDueDate: Task | string | null | undefined;

  /**
   * Statut de la tâche (optionnel si la tâche complète est passée à appOverdue).
   */
  @Input() status?: string;

  /**
   * Date de référence (par défaut aujourd'hui).
   */
  @Input() referenceDate: Date = new Date();

  /**
   * Indique si la tâche est actuellement en retard.
   */
  isOverdue = false;

  @HostBinding('class.is-overdue')
  get overdueClass(): boolean {
    return this.isOverdue;
  }

  @HostBinding('class.border-rose-400')
  get overdueBorderClass(): boolean {
    return this.isOverdue;
  }

  @HostBinding('class.bg-rose-50/30')
  get overdueBgClass(): boolean {
    return this.isOverdue;
  }

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateOverdueStatus();
  }

  private updateOverdueStatus(): void {
    let dueDate: string | undefined;
    let taskStatus: string | undefined = this.status;

    if (
      typeof this.taskOrDueDate === 'object' &&
      this.taskOrDueDate !== null &&
      'id' in this.taskOrDueDate
    ) {
      const task = this.taskOrDueDate as Task;
      dueDate = task.dueDate;
      if (!taskStatus) {
        taskStatus = task.status;
      }
    } else if (typeof this.taskOrDueDate === 'string') {
      dueDate = this.taskOrDueDate;
    }

    // Une tâche terminée n'est JAMAIS signalée comme en retard
    if (taskStatus === 'Terminé') {
      this.isOverdue = false;
      return;
    }

    if (!dueDate || !dueDate.trim()) {
      this.isOverdue = false;
      return;
    }

    let targetDate: Date;
    const trimmed = dueDate.trim();

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

    const ref = new Date(
      this.referenceDate.getFullYear(),
      this.referenceDate.getMonth(),
      this.referenceDate.getDate()
    );

    // En retard si la date d'échéance est strictement antérieure à aujourd'hui (minuit)
    this.isOverdue = targetDate.getTime() < ref.getTime();
  }
}
