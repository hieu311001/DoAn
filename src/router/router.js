import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/view/Auth/LoginPage';
import RegisterPage from '@/components/view/Auth/RegisterPage';
import ForgotPasswordPage from '@/components/view/Auth/ForgotPasswordPage'
import TheHome from '@/components/view/Home/TheHome';
import SellPage from '@/components/view/Sells/SellPage';
import ProductPage from '@/components/view/Product/ProductPage.vue';
import ProductOrderPage from '@/components/view/ProductOrder/ProductOrderPage.vue';
import StorageOrderPage from '@/components/view/ProductStore/StorageOrderPage.vue';
import HistoryPage from '@/components/view/History/HistoryPage.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: ForgotPasswordPage
  },
  {
    path: '/home',
    name: 'home',
    component: TheHome,
  },
  {
    path: '/sell',
    name: 'content',
    components: {
      default: SellPage,
      content: SellPage, 
    },
  },
  {
    path: '/product',
    name: 'product',
    components: {
      default: ProductPage,
      content: ProductPage, 
    },
  },
  {
    path: '/product-order',
    name: 'product-order',
    components: {
      default: ProductOrderPage,
      content: ProductOrderPage, 
    },
  },
  {
    path: '/store-order',
    name: 'store-order',
    components: {
      default: StorageOrderPage,
      content: StorageOrderPage, 
    },
  },
  {
    path: '/history',
    name: 'history',
    components: {
      default: HistoryPage,
      content: HistoryPage, 
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router