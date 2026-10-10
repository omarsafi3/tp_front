import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TaskList } from '../../../projects/components/task-list/task-list';
import { Task } from '../../../projects/models/task.model';

@Component({
  selector: 'app-user-project-group',
  standalone: true,
  imports: [CommonModule, TaskList],
  templateUrl: './user-project-group.html',
  styleUrl: './user-project-group.css',
})
export class UserProjectGroup {
  readonly projectName = input.required<string>();
  readonly tasks = input.required<Task[]>();
}
