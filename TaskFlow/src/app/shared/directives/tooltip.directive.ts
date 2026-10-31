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
    // S'assurer que l'élément hôte est en position relative et élevé au-dessus des frères
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '100');

    // 1. Création de l'élément bulle <span> avec Renderer2
    this.tooltipElement = this.renderer.createElement('span');

    // 2. Création du nœud texte avec Renderer2 (sans innerHTML)
    const textNode = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltipElement, textNode);

    // 3. Classes Tailwind pour une infobulle moderne, contrastée et jamais rognée
    const classes = [
      'app-tooltip-bubble',
      'absolute',
      'z-50',
      'left-0',
      'top-full',
      'mt-2',
      'px-3',
      'py-2',
      'text-[11px]',
      'font-normal',
      'normal-case',
      'tracking-normal',
      'leading-relaxed',
      'text-slate-100',
      'bg-slate-900/95',
      'backdrop-blur-md',
      'rounded-xl',
      'shadow-xl',
      'pointer-events-none',
      'whitespace-normal',
      'break-words',
      'w-64',
      'max-w-[270px]',
      'border',
      'border-slate-700/80',
    ];
    for (const cls of classes) {
      this.renderer.addClass(this.tooltipElement, cls);
    }

    // 4. Ajout de la bulle à l'élément hôte avec Renderer2
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
  }

  private removeTooltip(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
    this.renderer.removeStyle(this.el.nativeElement, 'z-index');
  }
}
