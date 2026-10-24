import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  standalone: true,
  imports: [HighlightDirective],
  template: `
    <div id="test-default" appHighlight>Elément par défaut</div>
    <div id="test-custom" [appHighlight]="'#e0e7ff'">Elément personnalisé</div>
  `,
})
class TestHostComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, HighlightDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should change background color on mouseenter with default color and restore on mouseleave', () => {
    const defaultEl = fixture.debugElement.query(By.css('#test-default'));
    const nativeEl = defaultEl.nativeElement as HTMLElement;

    const initialColor = nativeEl.style.backgroundColor;

    // Hover
    defaultEl.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    expect(nativeEl.style.backgroundColor).toBe('rgb(241, 245, 249)'); // #f1f5f9

    // Leave
    defaultEl.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    expect(nativeEl.style.backgroundColor).toBe(initialColor);
  });

  it('should change background color on mouseenter with custom color and restore on mouseleave', () => {
    const customEl = fixture.debugElement.query(By.css('#test-custom'));
    const nativeEl = customEl.nativeElement as HTMLElement;

    const initialColor = nativeEl.style.backgroundColor;

    // Hover
    customEl.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    expect(nativeEl.style.backgroundColor).toBe('rgb(224, 231, 255)'); // #e0e7ff

    // Leave
    customEl.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    expect(nativeEl.style.backgroundColor).toBe(initialColor);
  });
});
