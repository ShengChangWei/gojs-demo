import Vue from 'vue';
import Router from 'vue-router';

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条样式
import { getToken } from '@/services/auth.service';
import loginService from '@/api/login.js';
import store from './store';
import Home from '@/views/home/home.vue'
Vue.use(Router);
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
const routerReplace = Router.prototype.replace
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Router.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(error => error)
}
const router = new Router({
  routes: [

    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/',
      component: Home,
      redirect: '/baseUse',
      meta: { title: '基础用法' },
      children: [
        {
          path: 'baseUse',
          name: 'baseUse',
          component: () => import('@/views/base-use/index.vue'),
          meta: { title: '基础用法' }
        }
      ]
    },
    {
      path: '/',
      component: Home,
      redirect: '/treeModel',
      meta: { title: '树状图' },
      children: [
        {
          path: 'treeModel',
          name: 'treeModel',
          component: () => import('@/views/tree-model/index.vue'),
          meta: { title: '树状图' }
        }
      ]
    },
    {
      path: '/',
      component: Home,
      redirect: '/goLink',
      meta: { title: '动态线流程' },
      children: [
        {
          path: 'goLink',
          name: 'goLink',
          component: () => import('@/views/go-link/index.vue'),
          meta: { title: '动态线流程' }
        }
      ]
    },
    {
      path: '/',
      component: Home,
      redirect: '/treeModel',
      meta: { title: '' },
      children: [
        {
          path: 'treeModel',
          name: 'treeModel',
          component: () => import('@/views/tree-model/index.vue'),
          meta: { title: '树状图' }
        }
      ]
    },
    {
      path: '/',
      component: Home,
      redirect: '/operationMonitorin',
      meta: { title: '雨量查询' },
      children: [
        {
          path: 'operationMonitorin',
          name: 'operationMonitorin',
          component: () => import('@/views/operation-monitorin/operation-monitorin.vue'),
          meta: { title: '表格' }
        }
      ]
    },
    {
      path: '/dataReport',
      component: Home,
      redirect: '/dataReport/userWaterData',
      meta: { title: '雨量查询' },
      children: [
        {
          path: 'userWaterData',
          name: 'userWaterData',
          component: () => import('@/views/data-report/user-water-data.vue'),
          meta: { title: '用水' }
        },
        {
          path: 'userElectricityData',
          name: 'userElectricityData',
          component: () => import('@/views/data-report/use-electricity-data.vue'),
          meta: { title: '用电' }
        }
      ]
    },
    {
      path: '*',
      component: () => import('@/views/errorPage/404')
    }
  ]
});

/**
    * 获取用户菜单（导航栏菜单）
    */
function getUserMenus() {
  return new Promise((resolve, reject) => {
    loginService.getUserMenus().then(res => {
      resolve(res.result);
    });
  });
}
/**
 * 获取用户资源
 */
function getUserResources() {
  return new Promise((resolve, reject) => {
    loginService.getUserResources().then(res => {
      resolve(res.result);
    });
  });
}
// 路由拦截

router.beforeEach((to, from, next) => {
  NProgress.start();
  NProgress.done();
  next()
  // if (to.name === 'login') {
  //   next();
  //   NProgress.done();
  // } else {
  //   if (!getToken()) {
  //     next({
  //       name: 'login'
  //     });
  //     NProgress.done();
  //   } else {
  //     if (store.state.currUserMenus.length <= 0) {
  //       Promise.all([getUserMenus(), getUserResources()]).then(data => {
  //         store.state.currUserMenus = data[0] ? data[0].children : [];
  //         store.state.currUserResources = data[1];
  //         NProgress.done();
  //         next();
  //       });
  //     } else {
  //       NProgress.done();
  //       next();
  //     }
  //   }
  //   next();
  //   NProgress.done();
  // }
});

export default router;
