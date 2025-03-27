import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  // Uncommenting both will fix the issue
  // {
  //   path: 'home',
  //   renderMode: RenderMode.Client,
  // },
  // {
  //   path: 'features/view',
  //   renderMode: RenderMode.Client,
  // },
  {
    path: 'features',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'features/details',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
    status: 404,
  },
];
