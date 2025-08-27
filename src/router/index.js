import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/pages/Login.vue'
import Cart from '@/components/pages/Cart.vue'
import Product from '@/components/pages/Product.vue'
import Navbar from '@/components/includes/Navbar.vue'
import MainSidebar from '@/components/includes/MainSidebar.vue'
import ControlSidebar from '@/components/includes/ControlSidebar.vue'
import Footer from '@/components/includes/Footer.vue'
import NotFound from '@/components/NotFound.vue'
import Dashboard from '@/components/pages/Dashboard.vue'
import { useStore } from 'vuex'
import axios from 'axios';

const includes = {
  navbar: Navbar,
  mainSideBar: MainSidebar,
  controlSideBar: ControlSidebar,
  footer: Footer
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    components: {
      default: Dashboard,
      ...includes
    }
  },
  {
    path: '/product',
    name: 'product',
    components: {
      default: Product,
      ...includes
    }
  }, {
    path: '/cart',
    name: 'cart',
    components: {
      default: Cart,
      ...includes
    }
  },
  {
    path: '/:path(.*)*',
    component: NotFound
  }],
})



router.beforeEach(async (to, from) => {
  try {
    const store = useStore();
    let accessToken = store.state.profile?.accessToken || null;
    if (!profile) {
      const refreshResult = await axios.post('https://dummyjson.com/auth/refresh', {
        refreshToken: localStorage.getItem('refreshToken'),
        expiresInMins: 30,
      });
      localStorage.setItem('refreshToken', refreshResult.data.refreshToken);
      accessToken = refreshResult.data.accessToken
    }

    const result = await axios.get('https://dummyjson.com/auth/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    store.commit('refreshProfile', result.data)
  } catch (error) {
    console.log(error)

  }
});

export default router
