import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
})
export class EmptyState {
  readonly title = input<string>('Aucun élément trouvé');
  readonly message = input<string>('Aucun élément ne correspond à votre recherche.');
}
