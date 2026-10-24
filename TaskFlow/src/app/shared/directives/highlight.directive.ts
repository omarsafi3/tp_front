import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnInit {
  /**
   * Couleur de survol personnalisée (par exemple '#f1f5f9' par défaut).
   */
  @Input('appHighlight') highlightColor: string = '#f1f5f9';

  private originalColor: string = '';

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Sauvegarder la couleur de fond d'origine de l'élément
    this.originalColor = this.el.nativeElement.style.backgroundColor || '';
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.highlightColor || '#f1f5f9'
    );
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.originalColor
    );
  }
}
