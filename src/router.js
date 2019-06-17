import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    { // 首页
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    { // 节点详情页
      path: '/details',
      name: 'details',
      component: () => import('./views/Details.vue')
    },
    { // 修改节点信息
      path: '/alterMsg',
      name: 'alterMsg',
      component: () => import('./views/AlterMsg.vue')
    },
    { // 登录页
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    { // 修改密码
      path: '/amendPasswd',
      name: 'amendPasswd',
      component: () => import('./views/AmendPasswd.vue')
    },
    { // 修改密码
      path: '/userName',
      name: 'userName',
      component: () => import('./views/UserName.vue')
    }
  ]
})

export default router;
