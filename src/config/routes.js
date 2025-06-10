import HomePage from '@/components/pages/HomePage';

export const routes = [
  {
    id: 'home',
    label: 'Tasks',
    path: '/tasks',
    icon: 'CheckSquare',
component: HomePage
  }
];

export const routeArray = Object.values(routes);