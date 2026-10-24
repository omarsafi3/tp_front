import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  /**
   * Retourne les initiales en majuscules des deux premiers mots d'un nom.
   * - « Amira Ben Salah » -> « AB »
   * - « karim » -> « K »
   * - Valeur absente, vide ou sans lettres -> « ? »
   *
   * @param value Le nom complet à convertir.
   * @returns Les initiales en majuscules ou « ? ».
   */
  transform(value: string | null | undefined): string {
    if (!value) {
      return '?';
    }

    const words = value
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);

    if (words.length === 0) {
      return '?';
    }

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }
}
