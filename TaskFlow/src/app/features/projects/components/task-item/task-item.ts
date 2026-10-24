import { Component, input } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  // Entrée obligatoire task avec l'API moderne input()
  readonly task = input.required<Task>();
}
