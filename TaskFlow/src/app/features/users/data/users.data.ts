import { User } from '../models/user.model';

export const USERS: User[] = [
  {
    id: 1,
    name: 'Amira Ben Salah',
    email: 'amira@taskflow.tn',
    role: 'Développeur',
    active: true,
  },
  {
    id: 2,
    name: 'Youssef Mansour',
    email: 'youssef@taskflow.tn',
    role: 'Développeur Fullstack',
    active: true,
  },
  {
    id: 3,
    name: 'Sarra Trabelsi',
    email: 'sarra@taskflow.tn',
    role: 'UI/UX Designer',
    active: false, // Utilisateur inactif
  },
  {
    id: 4,
    name: 'Karim Jaziri',
    email: 'karim@taskflow.tn',
    role: 'Chef de projet',
    active: true, // Utilisateur sans aucune tâche
  },
];
