import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

export type ViewMode = 'tasks' | 'users';

@Component({
  selector: 'app-view-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-toggle.html',
  styleUrl: './view-toggle.css',
})
export class ViewToggle {
  // Vue active ('tasks' ou 'users')
  readonly currentView = input<ViewMode>('tasks');

  // Événement émis lors du changement de vue
  readonly viewChange = output<ViewMode>();

  setView(view: ViewMode): void {
    if (this.currentView() !== view) {
      this.viewChange.emit(view);
    }
  }
}
