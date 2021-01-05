import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        meta: { name: 'pages.index' },
        component: () => import('pages/Index.vue')
      },
      {
        path: '/sound',
        meta: { name: 'pages.sound' },
        component: () => import('pages/sound.vue')
      },
      {
        path: '/settings',
        meta: { name: 'pages.settings' },
        component: () => import('pages/settings.vue')
      },
      {
        path: '/about',
        meta: { name: 'pages.about' },
        component: () => import('pages/about.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
