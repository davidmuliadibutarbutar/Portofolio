import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Projects from '../views/Projects.vue';
import ProjectDetail from '../views/ProjectDetail.vue';
import Experience from '../views/Experience.vue';
import Contact from '../views/Contact.vue';
import Login from '../views/admin/Login.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import ChangePassword from '../views/admin/ChangePassword.vue';
import AdminCollection from '../views/admin/AdminCollection.vue';
import { useAuthStore } from '../stores/authStore';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: Home },
  { path: '/projects', component: Projects },
  { path: '/projects/:id', component: ProjectDetail },
  { path: '/experience', component: Experience },
  { path: '/contact', component: Contact },
  { path: '/admin/login', component: Login, meta: { guest: true } },
  { path: '/admin', component: Dashboard, meta: { admin: true } },
  { path: '/admin/change-password', component: ChangePassword, meta: { admin: true } },
  { path: '/admin/:collection', component: AdminCollection, meta: { admin: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.admin && !auth.isAuthenticated) return '/admin/login';
  if (to.meta.guest && auth.isAuthenticated) return '/admin';
  return true;
});

export default router;
