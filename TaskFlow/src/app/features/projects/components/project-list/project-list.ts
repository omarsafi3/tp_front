import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../../core/services/project.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Project } from '../../models/project.model';
import { ProjectCard, ProjectTaskStatusChangeEvent } from '../project-card/project-card';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectCard, EmptyState],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {
  // Service injecté pour la récupération des projets avec RxJS (Partie 12)
  private readonly projectService = inject(ProjectService);

  // Partie 10.1 : Signal pour stocker les projets
  readonly projects = signal<Project[]>([]);

  // Partie 11.1 : Signal pour le terme de recherche (lié à [(ngModel)])
  readonly searchTerm = signal<string>('');

  // Projet actuellement sélectionné via l'output (Partie 6.5)
  readonly selectedProject = signal<Project | null>(null);

  // Partie 11.2 : Computed signal pour filtrer les projets selon leur nom
  readonly filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    return this.projects().filter((project) =>
      project.name.toLowerCase().includes(term)
    );
  });

  // Partie 12.4 : Subscription explicite à l'Observable du service
  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects.set(projects);
    });
  }

  // Partie 6.5 : Réception de l'output émis par ProjectCard
  onProjectSelected(project: Project): void {
    console.log(project);
    this.selectedProject.set(project);
  }

  // Partie 3.6 : Mise à jour immutable du projet et de la tâche correspondante
  onTaskStatusChange(event: ProjectTaskStatusChangeEvent): void {
    this.projects.update((currentProjects) =>
      currentProjects.map((project) => {
        if (project.id !== event.projectId) {
          return project;
        }
        return {
          ...project,
          tasks: project.tasks.map((task) =>
            task.id === event.taskId ? { ...task, status: event.newStatus } : task
          ),
        };
      })
    );

    // Mettre à jour selectedProject si c'est le projet dont la tâche a changé
    const sel = this.selectedProject();
    if (sel && sel.id === event.projectId) {
      const updated = this.projects().find((p) => p.id === event.projectId);
      if (updated) {
        this.selectedProject.set(updated);
      }
    }
  }
}
