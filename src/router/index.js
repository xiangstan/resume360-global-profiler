import { createRouter, createWebHistory } from 'vue-router';

import { useAppStore } from '@/stores/app';
import { useMyAccount } from '@/stores/account';

import { ajaxCall, ajaxCompare } from '@/utils/ajax'
import browserDetect from '@/utils/browser';

//import HomeView from '../views/HomeView.vue';

import ContactView from '@/components/static/ContactView.vue';
import HomeAboutView from '@/components/static/HomeAboutView.vue';

const updInternal = (status) => {
  const store = useAppStore();
  store.updateInternalStatus(status)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }else if(to.hash){ // Added condition for hash-based scrolling
      return{
        el: to.hash, //el: scroll position element
        behavior: 'smooth'
    };
    }else {
      return { top: 0 };
    }
  },
  routes: [
        // *** Added the HomeAboutView ContactView route ***

        {
          path: '/',
          name: 'HomeAbout',
          component: HomeAboutView,
          meta: {
            title: 'Home About'
          }
        },
        
        {
          path: '/',
          name: 'Contact',
          component:ContactView,
          meta: {
            title: 'Contact Us'
          }
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
        isInternal: true,
        title: 'User Dashboard'
      }
    },
    {
      path: "/user/resume",
      name: "ResumeView",
      component: () => import('../views/resume/ResumeView.vue'),
      meta: {
        isInternal: true,
        title: 'User Resume'
      }
    },
    {
      path: "/user/wallet",
      name: "WalletView",
      component: () => import('../views/wallet/WalletView.vue'),
      meta: {
        isInternal: true,
        title: 'User Wallet'
      }
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  /*** set up page title */
  const defaultPageTitle = import.meta.env.VITE_APP_SITE_LONG;
  document.title = (to.meta.title) ? to.meta.title + " | " + defaultPageTitle : defaultPageTitle;
  /*** check if the next page is an internal page */
  if (to.matched.some(record => record.meta.isInternal)) {
    const status = to.meta.isInternal;
    updInternal(status);
    if (status) {
      const accountStore = useMyAccount();
      // gather local browser data
      const localStoredUser = localStorage.getItem(import.meta.env.VITE_APP_SITE_SHORT + "User");
      const localStoredToken = sessionStorage.getItem(import.meta.env.VITE_APP_SITE_SHORT + "Token");
      if (localStoredUser === null || localStoredToken === null) {
        console.log("No saved user");
        document.title = defaultPageTitle;
        updInternal(false);
        next({ path: '/' });
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
            next("/");
            document.title = defaultPageTitle;
            return;
          }
        }
        catch (error) {
          console.error("Error verifying user:", error);
          updInternal(false);
          next("/"); // Handle error by redirecting
          document.title = defaultPageTitle;
          return;
        }
      }
    }
  }
  to.meta.previousRoute = from.path;
  next();
});

export default router
