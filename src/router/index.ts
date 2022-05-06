import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Login from "@/views/Login.vue";
import ChoiceCharacter from "@/views/ChoiceCharacter.vue";
import {store} from "@/store/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      hideForAuth: true,
      transition: 'bounce'
    }
  },
  {
    path: '/choice-character',
    component: ChoiceCharacter,
    meta: {
      hideForAuth: true,
      transition: 'bounce'
    }
  },
  {
    path: '/rooms/',
    component: () => import('@/views/Rooms.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/rooms/:id',
    component: () => import('@/views/Room.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.getUser) {
      if (!store.getters.getCharacter) {
        router.push({path: '/login'});
      } else {
        router.push({path: '/choice-character'});
      }
    } else {
      next();
    }

  } else {
    next();
  }

  if (to.matched.some(record => record.meta.hideForAuth)) {
    if (store.getters.getUser && store.getters.getCharacter) {
      router.push({ path: '/rooms' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
