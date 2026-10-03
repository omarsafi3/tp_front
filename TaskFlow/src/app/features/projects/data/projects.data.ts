import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Refonte du Portail Client',
    description:
      'Modernisation complète de l’interface client avec Angular 19/22, intégration d’un design system réactif et amélioration des performances d’affichage.',
    status: 'En cours',
    tasks: [
      {
        id: 1,
        title: 'Maquettage des écrans sur Figma',
        priority: 'Haute',
        status: 'Terminé',
      },
      {
        id: 2,
        title: 'Intégration des composants UI et Tailwind CSS',
        priority: 'Haute',
        status: 'En cours',
      },
      {
        id: 3,
        title: 'Connexion aux APIs REST & gestion d’état',
        priority: 'Moyenne',
        status: 'En attente',
      },
      {
        id: 4,
        title: 'Tests unitaires et validation d’accessibilité (RGAA)',
        priority: 'Basse',
        status: 'En attente',
      },
    ],
  },
  {
    id: 2,
    name: 'Application Mobile TaskFlow',
    description:
      'Développement d’une application mobile cross-platform avec synchronisation hors-ligne, notifications push et authentification biométrique.',
    status: 'En attente',
    tasks: [
      {
        id: 1,
        title: 'Spécification de l’architecture logicielle',
        priority: 'Haute',
        status: 'En attente',
      },
      {
        id: 2,
        title: 'Mise en place du pipeline CI/CD automatisé',
        priority: 'Moyenne',
        status: 'En attente',
      },
      {
        id: 3,
        title: 'Implémentation de l’authentification OAuth2',
        priority: 'Haute',
        status: 'En attente',
      },
    ],
  },
  {
    id: 3,
    name: 'Migration Infrastructure Cloud AWS',
    description:
      'Migration des serveurs on-premise vers des clusters Kubernetes managés (EKS), mise en place de la surveillance Prometheus/Grafana.',
    status: 'Terminé',
    tasks: [
      {
        id: 1,
        title: 'Audit sécurité et inventaire des microservices',
        priority: 'Haute',
        status: 'Terminé',
      },
      {
        id: 2,
        title: 'Déploiement des templates Terraform EKS & VPC',
        priority: 'Haute',
        status: 'Terminé',
      },
      {
        id: 3,
        title: 'Bascule DNS et tests de charge de non-régression',
        priority: 'Moyenne',
        status: 'Terminé',
      },
    ],
  },
];
