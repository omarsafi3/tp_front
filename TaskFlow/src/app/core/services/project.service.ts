import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PROJECTS } from '../../features/projects/data/projects.data';
import { Project } from '../../features/projects/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // Copie immuable en mémoire permettant de conserver l'état entre les vues ("Par tâche" / "Par user")
  private projectsState: Project[] = PROJECTS.map((project) => ({
    ...project,
    tasks: project.tasks.map((task) => ({ ...task })),
  }));

  getProjects(): Observable<Project[]> {
    return of(this.projectsState);
  }

  /**
   * Synchronise l'état courant des projets après une mise à jour immuable
   */
  syncProjects(projects: Project[]): void {
    this.projectsState = projects;
  }
}
