import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';

@Component({
  standalone: true,
  imports: [TooltipDirective],
  template: `
    <span id="tooltip-target" [appTooltip]="text">Texte tronqué</span>
    <span id="tooltip-empty" [appTooltip]="''">Texte vide</span>
  `,
})
class TestTooltipHostComponent {
  text = 'Description complète ultra détaillée';
}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestTooltipHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTooltipHostComponent, TooltipDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTooltipHostComponent);
    fixture.detectChanges();
  });

  it('should display tooltip span on mouseenter and remove it on mouseleave', () => {
    const target = fixture.debugElement.query(By.css('#tooltip-target'));
    const targetEl = target.nativeElement as HTMLElement;

    // Initially no tooltip
    expect(targetEl.querySelector('.app-tooltip-bubble')).toBeNull();

    // Trigger mouseenter
    target.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    const bubble = targetEl.querySelector('.app-tooltip-bubble') as HTMLElement;
    expect(bubble).not.toBeNull();
    expect(bubble.tagName.toLowerCase()).toBe('span');
    expect(bubble.textContent).toBe('Description complète ultra détaillée');

    // Trigger mouseleave
    target.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();

    expect(targetEl.querySelector('.app-tooltip-bubble')).toBeNull();
  });

  it('should not display tooltip if tooltip text is empty', () => {
    const emptyTarget = fixture.debugElement.query(By.css('#tooltip-empty'));
    const targetEl = emptyTarget.nativeElement as HTMLElement;

    emptyTarget.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    expect(targetEl.querySelector('.app-tooltip-bubble')).toBeNull();
  });
});
