import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Index from '@/pages/Index'
import User from '@/components/user/user'
import UserGroup from '@/components/user/userGroup'
import UserList from '@/components/user/userList'
import UserDetail from '@/components/user/userDetail'
import UserActiving from '@/components/user/userActiving'


let IndexCompontent=[
  {
    path:'/index/user',
    name:'user',
    component:User,
    children:[{
      path:'/index/user/list',
      name:'userList',
      component:UserList,
    },
      {
        path:'/index/user/group',
        name:'userGroup',
        component:UserGroup,
      },{
        path:'/index/user/detail',
        name:'userDetail',
        component:UserDetail,
      },{
        path:'/index/user/activing',
        name:'userActiving',
        component:UserActiving,
      },
    ],
  },
];
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path:'/index',
      name:'index',
      component:Index,
      children:IndexCompontent
    }
  ]
})
