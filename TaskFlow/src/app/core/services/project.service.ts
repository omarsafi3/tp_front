import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PROJECTS } from '../../features/projects/data/projects.data';
import { Project } from '../../features/projects/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  getProjects(): Observable<Project[]> {
    return of(PROJECTS);
  }
}
