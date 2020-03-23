export default[
  {
    key:'1',
    title:"首页",
    icon:'home',
    path:'/admin/home'
  },
  {
   key:'2',
   title:'用户管理',
   icon:'user',
   path:'/admin/user',
   children:[
     {
       key:'2-1',
       title:"用户添加",
       path:'/admin/useradd'
      },
     {
      key:'2-2',
      title:"用户列表",
      path:'/admin/userlist'
    }
   ]
  },
  {
    key:'9',
    title:"设置",
    icon:'set',
    path:'/admin/set'
  },
]