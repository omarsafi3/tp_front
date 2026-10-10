import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../features/users/models/user.model';
import { USERS } from '../../features/users/data/users.data';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(): Observable<User[]> {
    return of(USERS);
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(USERS.find((user) => user.id === id));
  }
}

