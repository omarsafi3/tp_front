import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import {
  ProjectTaskDeleteEvent,
  ProjectTaskStatusChangeEvent,
} from '../../../projects/components/project-card/project-card';
import {
  TaskDeleteEvent,
  TaskList,
  TaskStatusChangeEvent,
} from '../../../projects/components/task-list/task-list';
import { Task } from '../../../projects/models/task.model';

@Component({
  selector: 'app-user-project-group',
  standalone: true,
  imports: [CommonModule, TaskList],
  templateUrl: './user-project-group.html',
  styleUrl: './user-project-group.css',
})
export class UserProjectGroup {
  readonly projectId = input<number>(0);
  readonly projectName = input.required<string>();
  readonly tasks = input.required<Task[]>();

  readonly taskStatusChange = output<ProjectTaskStatusChangeEvent>();
  readonly taskDelete = output<ProjectTaskDeleteEvent>();

  onTaskStatusChange(event: TaskStatusChangeEvent): void {
    this.taskStatusChange.emit({
      projectId: this.projectId(),
      taskId: event.taskId,
      newStatus: event.newStatus,
    });
  }

  onTaskDelete(event: TaskDeleteEvent): void {
    this.taskDelete.emit({
      projectId: this.projectId(),
      taskId: event.taskId,
    });
  }
}
