import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../features/users/models/user.model';
import { USERS } from '../../features/users/data/users.data';

@Injectable({ providedIn: 'root' })
export class UserService {
  /**
   * Retourne la liste complète des utilisateurs sous forme d'Observable
   */
  getUsers(): Observable<User[]> {
    return of(USERS);
  }

  /**
   * Retrouve un utilisateur par son identifiant sous forme d'Observable
   * @param id Identifiant numérique de l'utilisateur
   */
  getUserById(id: number): Observable<User | undefined> {
    return of(USERS.find((user) => user.id === id));
  }

  /**
   * Retourne le nom de l'utilisateur ou 'Non assigné' si id absent ou non trouvé
   * @param id Identifiant optionnel de l'utilisateur
   */
  getUserNameById(id?: number): string {
    if (!id) {
      return 'Non assigné';
    }
    const user = USERS.find((u) => u.id === id);
    return user ? user.name : 'Non assigné';
  }
}
