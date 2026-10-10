import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../../core/services/project.service';
import { UserService } from '../../../../core/services/user.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Project } from '../../../projects/models/project.model';
import { User } from '../../models/user.model';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, UserCard, EmptyState],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  // Services injectés
  private readonly userService = inject(UserService);
  private readonly projectService = inject(ProjectService);

  // Signaux de données
  readonly users = signal<User[]>([]);
  readonly projects = signal<Project[]>([]);
  readonly searchTerm = signal<string>('');
  readonly selectedUser = signal<User | null>(null);

  // Filtre par statut d'activité
  readonly activeFilter = signal<'Tous' | 'Actifs' | 'Inactifs'>('Tous');

  // Statistiques calculées
  readonly totalUsersCount = computed(() => this.users().length);
  readonly activeUsersCount = computed(() => this.users().filter((u) => u.active).length);
  readonly inactiveUsersCount = computed(() => this.users().filter((u) => !u.active).length);

  // Utilisateurs filtrés par recherche et par statut
  readonly filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const filter = this.activeFilter();

    return this.users().filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term);

      const matchesFilter =
        filter === 'Tous' ||
        (filter === 'Actifs' && user.active) ||
        (filter === 'Inactifs' && !user.active);

      return matchesSearch && matchesFilter;
    });
  });

  ngOnInit(): void {
    // Récupération des utilisateurs
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });

    // Récupération des projets (pour les tâches assignées)
    this.projectService.getProjects().subscribe((projects) => {
      this.projects.set(projects);
    });
  }

  // Communication avec UserCard via output
  onUserSelected(user: User): void {
    console.log('Utilisateur sélectionné :', user);
    this.selectedUser.set(user);
  }

  setActiveFilter(filter: 'Tous' | 'Actifs' | 'Inactifs'): void {
    this.activeFilter.set(filter);
  }
}
