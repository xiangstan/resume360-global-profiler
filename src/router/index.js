import { createRouter, createWebHistory } from 'vue-router';

import { useAppStore } from '@/stores/app';
import { useMyAccount } from '@/stores/account';

import { ajaxCall, ajaxCompare } from '@/utils/ajax'
import browserDetect from '@/utils/browser';

import HomeView from '../views/HomeView.vue';

const updInternal = (status) => {
  console.log("I am updating my isInternal status to " + status)
  const store = useAppStore();
  store.updateInternalStatus(status)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: "/user/dashboard",
      name: "DashboardView",
      component: () => import('../views/dashboard/HomeView.vue'),
      meta: {
        isInternal: true
      }
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.isInternal)) {
    console.log("I am in beforeEach")
    const status = to.meta.isInternal;
    console.log("Status is " + typeof status)
    updInternal(status);
    if (status) {
      const accountStore = useMyAccount();
      // gather local browser data
      const localStoredUser = localStorage.getItem(import.meta.env.VITE_APP_SITE_SHORT + "User");
      const localStoredToken = sessionStorage.getItem(import.meta.env.VITE_APP_SITE_SHORT + "Token");
      if (localStoredUser === null || localStoredToken === null) {
        console.log("No saved user");
        next("/");
        return;
      }
      const myStoredUser = accountStore.profile.email || "";
      if (localStoredUser !== myStoredUser) {
        const browser = browserDetect();
        const requestData = {
          browser: browser.browser.name,
          user: localStoredUser
        }
        try {
          const result = await ajaxCall({
            data: requestData,
            url: "user/verify"
          });
          if (ajaxCompare(result.errno, [1])) {
            accountStore.updateAccountData({
              key: "profile",
              value: result.errmsg[0]
            });
          }
          else {
            updInternal(false);
            next("/")
            return;
          }
        }
        catch (error) {
          console.error("Error verifying user:", error);
          updInternal(false);
          next("/"); // Handle error by redirecting
          return;
        }
      }
    }
  }
  to.meta.previousRoute = from.path;
  next();
});

export default router
