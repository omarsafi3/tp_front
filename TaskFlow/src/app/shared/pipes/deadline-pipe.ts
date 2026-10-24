import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deadline',
  standalone: true,
})
export class DeadlinePipe implements PipeTransform {
  /**
   * Retourne un texte relatif à aujourd'hui pour une date d'échéance :
   * - « Pas d’échéance » si la date est absente
   * - « Aujourd’hui » si l'échéance est aujourd'hui
   * - « Demain » si l'échéance est demain
   * - « Dans n jours » pour une date future (> 1 jour)
   * - « En retard de n jour(s) » pour une date passée (singulier quand n vaut 1)
   *
   * @param value Date sous forme de string ou d'objet Date.
   * @param referenceDate Date de référence (par défaut aujourd'hui).
   * @returns Libellé relatif de l'échéance.
   */
  transform(
    value: string | Date | null | undefined,
    referenceDate: Date = new Date()
  ): string {
    if (!value) {
      return 'Pas d’échéance';
    }

    let targetDate: Date;

    if (value instanceof Date) {
      if (isNaN(value.getTime())) {
        return 'Pas d’échéance';
      }
      targetDate = new Date(
        value.getFullYear(),
        value.getMonth(),
        value.getDate()
      );
    } else if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) {
        return 'Pas d’échéance';
      }

      if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
        const [year, month, day] = trimmed
          .split('T')[0]
          .split('-')
          .map(Number);
        targetDate = new Date(year, month - 1, day);
      } else {
        const parsed = new Date(trimmed);
        if (isNaN(parsed.getTime())) {
          return 'Pas d’échéance';
        }
        targetDate = new Date(
          parsed.getFullYear(),
          parsed.getMonth(),
          parsed.getDate()
        );
      }
    } else {
      return 'Pas d’échéance';
    }

    const refDate = new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth(),
      referenceDate.getDate()
    );

    const diffMs = targetDate.getTime() - refDate.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Aujourd’hui';
    }

    if (diffDays === 1) {
      return 'Demain';
    }

    if (diffDays > 1) {
      return `Dans ${diffDays} jours`;
    }

    const overdueDays = Math.abs(diffDays);
    return overdueDays === 1
      ? 'En retard de 1 jour'
      : `En retard de ${overdueDays} jours`;
  }
}
