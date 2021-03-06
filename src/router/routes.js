export default function ({ store }) {
  if (process.env.CLIENT) {
    console.log('store: ', store)
  }

  const routes = [
    {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', component: () => import('pages/IndexPage.vue') },
        { name: 'PostsPage', path: 'posts/:postId?', component: () => import('pages/PostsPage.vue'), props: true }
      ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue')
    }
  ]

  return routes
}
