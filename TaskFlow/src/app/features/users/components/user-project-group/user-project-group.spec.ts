import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProjectGroup } from './user-project-group';

describe('UserProjectGroup', () => {
  let component: UserProjectGroup;
  let fixture: ComponentFixture<UserProjectGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProjectGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProjectGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
