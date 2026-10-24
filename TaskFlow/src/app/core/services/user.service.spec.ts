import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';
import { USERS } from '../../features/users/data/users.data';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all users with getUsers()', async () => {
    const users = await firstValueFrom(service.getUsers());
    expect(users).toEqual(USERS);
  });

  it('should find user by id with getUserById()', async () => {
    const user = await firstValueFrom(service.getUserById(1));
    expect(user).toBeDefined();
    expect(user?.id).toBe(1);
  });

  it('should return undefined when user id does not exist with getUserById()', async () => {
    const user = await firstValueFrom(service.getUserById(99999));
    expect(user).toBeUndefined();
  });

  it('should return user name or "Non assigné" with getUserNameById()', () => {
    expect(service.getUserNameById(1)).toBe('Amira Ben Salah');
    expect(service.getUserNameById(undefined)).toBe('Non assigné');
    expect(service.getUserNameById(99999)).toBe('Non assigné');
  });
});
