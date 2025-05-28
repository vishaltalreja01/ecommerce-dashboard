import { createRouter, createWebHistory } from 'vue-router';
import RevenueAnalysis from '../components/RevenueAnalysis.vue';
import InventoryManagement from '../components/InventoryManagement.vue';
import ProductRegistration from '../components/ProductRegistration.vue';

const routes = [
  { path: '/', redirect: '/revenue' },
  { path: '/revenue', name: 'Revenue', component: RevenueAnalysis },
  { path: '/inventory', name: 'Inventory', component: InventoryManagement },
  { path: '/register', name: 'Register', component: ProductRegistration },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
