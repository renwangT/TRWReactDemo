export const route = {
  exact: true,
  path: '/',
  name: 'Home',
  key: 'Home',
  redirect: '/basicData/agents',
  routes: [
    
    {
      exact: true,
      path: '/basicData',
      name: '基础数据',
      key: 'basicData',
      redirect: '/basicData/agents',
      component: '@/pages/index',
      routes: [
        {
          exact: true,
          path: '/basicData/template',
          name: '模板页面',
          key: 'template',
          component: '@/pages/basicData/template',
        },
        {
          exact: true,
          path: '/basicData/baiduEditor',
          name: '百度富文本编辑器',
          key: 'baiduEditor',
          component: '@/pages/basicData/baiduEditor',
        },
        
      ],
    },
  ],
};

export default {
  route,
  location: {
    pathname: '/',
  },
};
