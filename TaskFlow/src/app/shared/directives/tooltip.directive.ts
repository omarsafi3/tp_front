import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  /**
   * Texte complet à afficher dans l'infobulle au survol
   */
  @Input('appTooltip') tooltipText = '';

  private tooltipElement: HTMLElement | null = null;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.tooltipText || this.tooltipElement) {
      return;
    }
    this.createTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.removeTooltip();
  }

  ngOnDestroy(): void {
    this.removeTooltip();
  }

  private createTooltip(): void {
    // Création de l'élément bulle <span> avec Renderer2
    this.tooltipElement = this.renderer.createElement('span');

    // Création du nœud texte avec Renderer2 (sans innerHTML)
    const textNode = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltipElement, textNode);

    // Classes Tailwind et accessibilité
    this.renderer.addClass(this.tooltipElement, 'app-tooltip-bubble');
    this.renderer.addClass(this.tooltipElement, 'absolute');
    this.renderer.addClass(this.tooltipElement, 'z-50');
    this.renderer.addClass(this.tooltipElement, 'left-0');
    this.renderer.addClass(this.tooltipElement, 'top-full');
    this.renderer.addClass(this.tooltipElement, 'mt-1.5');
    this.renderer.addClass(this.tooltipElement, 'px-2.5');
    this.renderer.addClass(this.tooltipElement, 'py-1.5');
    this.renderer.addClass(this.tooltipElement, 'text-[11px]');
    this.renderer.addClass(this.tooltipElement, 'font-medium');
    this.renderer.addClass(this.tooltipElement, 'text-white');
    this.renderer.addClass(this.tooltipElement, 'bg-slate-900/95');
    this.renderer.addClass(this.tooltipElement, 'rounded-lg');
    this.renderer.addClass(this.tooltipElement, 'shadow-lg');
    this.renderer.addClass(this.tooltipElement, 'pointer-events-none');
    this.renderer.addClass(this.tooltipElement, 'whitespace-normal');
    this.renderer.addClass(this.tooltipElement, 'break-words');
    this.renderer.addClass(this.tooltipElement, 'max-w-[240px]');
    this.renderer.addClass(this.tooltipElement, 'sm:max-w-xs');
    this.renderer.addClass(this.tooltipElement, 'w-max');
    this.renderer.addClass(this.tooltipElement, 'border');
    this.renderer.addClass(this.tooltipElement, 'border-slate-700');

    // S'assurer que l'élément hôte est positionné en relative
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

    // Ajout de la bulle à l'élément hôte avec Renderer2
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
  }

  private removeTooltip(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
