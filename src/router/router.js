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
import StorePage from '@/components/view/Store/StorePage.vue';
import StaffPage from '@/components/view/Staff/StaffPage.vue';

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
    path: '/store',
    name: 'store',
    components: {
      default: StorePage,
      content: StorePage, 
    },
  },
  {
    path: '/staff',
    name: 'staff',
    components: {
      default: StaffPage,
      content: StaffPage, 
    },
  },
  {
    path: '/sell',
    name: 'sell',
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

// Navigation Guard để kiểm tra đường dẫn
router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    // Xóa token khỏi cookie hoặc localStorage
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  next(); // Tiếp tục điều hướng
});

export default router