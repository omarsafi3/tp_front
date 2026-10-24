import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCard } from './user-card';
import { User } from '../../models/user.model';

describe('UserCard', () => {
  let component: UserCard;
  let fixture: ComponentFixture<UserCard>;

  const mockUser: User = {
    id: 1,
    name: 'Amira Ben Salah',
    email: 'amira@taskflow.tn',
    role: 'Développeur',
    active: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCard],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCard);
    fixture.componentRef.setInput('user', mockUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
