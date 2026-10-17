import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  /**
   * Tronque un texte s'il dépasse une limite spécifiée.
   *
   * @param value Le texte d'origine à tronquer (peut être null ou undefined).
   * @param limit La longueur maximale autorisée (50 par défaut).
   * @param suffix Le suffixe à ajouter après troncature (« … » par défaut).
   * @returns Le texte tronqué avec suffixe, le texte d'origine s'il est court, ou une chaîne vide si absent.
   */
  transform(
    value: string | null | undefined,
    limit: number = 50,
    suffix: string = '…'
  ): string {
    if (!value) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    return value.slice(0, limit).trimEnd() + suffix;
  }
}
