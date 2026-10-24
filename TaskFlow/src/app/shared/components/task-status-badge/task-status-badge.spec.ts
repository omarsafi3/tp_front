import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskStatusBadge } from './task-status-badge';

describe('TaskStatusBadge', () => {
  let component: TaskStatusBadge;
  let fixture: ComponentFixture<TaskStatusBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskStatusBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskStatusBadge);
    fixture.componentRef.setInput('status', 'En attente');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display status text and apply amber styles for "En attente"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('En attente');
    expect(component.badgeClass()).toContain('bg-amber-100');
    expect(component.dotClass()).toBe('bg-amber-500');
  });

  it('should apply blue styles for "En cours"', async () => {
    fixture.componentRef.setInput('status', 'En cours');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('En cours');
    expect(component.badgeClass()).toContain('bg-blue-100');
    expect(component.dotClass()).toBe('bg-blue-500');
  });

  it('should apply emerald styles for "Terminé"', async () => {
    fixture.componentRef.setInput('status', 'Terminé');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Terminé');
    expect(component.badgeClass()).toContain('bg-emerald-100');
    expect(component.dotClass()).toBe('bg-emerald-500');
  });
});
