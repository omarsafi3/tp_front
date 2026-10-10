import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Refonte du site web',
    description: 'Nouvelle identité visuelle et nouvelle navigation.',
    status: 'En cours',
    tasks: [
      {
        id: 1,
        title: 'Maquettes de l’accueil',
        priority: 'Haute',
        status: 'Terminé',
        assigneeId: 1,
      },
      {
        id: 2,
        title: 'Intégration du header',
        priority: 'Moyenne',
        status: 'Terminé',
        assigneeId: 1,
      },
      {
        id: 3,
        title: 'Formulaire de contact',
        priority: 'Moyenne',
        status: 'En cours',
        assigneeId: 1,
      },
      {
        id: 4,
        title: 'Optimisation des images',
        priority: 'Basse',
        status: 'En attente',
        assigneeId: 1,
      },
      {
        id: 5,
        title: 'Tests responsive',
        priority: 'Haute',
        status: 'En attente',
        assigneeId: 3,
      },
    ],
  },
  {
    id: 2,
    name: 'Application mobile',
    description: 'Version mobile de TaskFlow.',
    status: 'En attente',
    tasks: [
      {
        id: 6,
        title: 'Choix de la stack',
        priority: 'Haute',
        status: 'Terminé',
        assigneeId: 1,
      },
      {
        id: 7,
        title: 'Authentification',
        priority: 'Haute',
        status: 'En cours',
        assigneeId: 2,
      },
      {
        id: 8,
        title: 'Écran de profil',
        priority: 'Moyenne',
        status: 'En attente',
        assigneeId: 1,
      },
      {
        id: 9,
        title: 'Notifications push',
        priority: 'Basse',
        status: 'En attente',
      }, // non assignée
    ],
  },
  {
    id: 3,
    name: 'Migration base de données',
    description: 'Passage vers un nouveau serveur.',
    status: 'En cours',
    tasks: [
      {
        id: 10,
        title: 'Audit du schéma',
        priority: 'Haute',
        status: 'Terminé',
        assigneeId: 2,
      },
      {
        id: 11,
        title: 'Script de migration',
        priority: 'Haute',
        status: 'Terminé',
        assigneeId: 2,
      },
      {
        id: 12,
        title: 'Validation des données',
        priority: 'Moyenne',
        status: 'En cours',
        assigneeId: 3,
      },
    ],
  },
  {
    id: 4,
    name: 'Documentation technique',
    description: 'Guide développeur.',
    status: 'En attente',
    tasks: [], // projet sans tâche
  },
];
