import React from 'react';
import { Layout as Layouted, Menu, Breadcrumb, Avatar, Dropdown, Card, Form } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  DownOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
// import { UserInfo, userStatus } from '@xtc/user-status';
import { route } from '@/routes/routesConfig';
console.log('%croute:', 'background: orange', route);

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layouted;

// const Logo = () => <img src={require('../assets/logo.png')} className="logo" alt="logo" />;

const getBreadcrumbNav = (path: string, router: any[]): any[] | undefined | boolean => {
  console.log('router:', router);
  let breadcrumb: any[] = [];
  const generateBreadcrumb = (path: string, arr: any[]) => {
    for (let i = 0, len = arr.length; i < len; i++) {
      breadcrumb.push({
        title: arr[i].name,
        path: arr[i].path,
      });
      if (arr[i].path === path) {
        return true;
      } else {
        if (arr[i].routes && arr[i].routes.length) {
          let index = breadcrumb.length - 1;
          if (generateBreadcrumb(path, arr[i].routes)) {
            return breadcrumb;
          } else {
            breadcrumb.splice(index, arr[i].routes.length);
          }
        } else {
          breadcrumb.splice(breadcrumb.length - 1, 1);
        }
      }
    }
    return false;
  };
  return generateBreadcrumb(path, router);
};
const Layout = (props: any) => {
  const { history, children } = props;
  console.log('props:', props);
  console.log(history);
  const [userInfo, setUserInfo] = React.useState<any>();
  const [breadcrumb, setBreadcrumb] = React.useState<Array<any> | boolean>();

  const dropdownMenu = (
    <Menu>
      <Menu.Item onClick={() => history.push('/admin')}>
        <SettingOutlined />
        管理
      </Menu.Item>
      <Menu.Item onClick={() => history.push('/logout')}>
        <LogoutOutlined />
        注销
      </Menu.Item>
    </Menu>
  );

  React.useEffect(() => {
    // userStatus.getUserInfo().then((res: any) => {
    //   setUserInfo(res);
    // });
  }, []);
  // 监听地址变化生成面包屑
  React.useEffect(() => {
    let breadcrumb = getBreadcrumbNav(history.location.pathname, route.routes) || [];
    console.log('%cbreadcrumb:', 'background: orange', breadcrumb);
    setBreadcrumb(breadcrumb);
  }, [history.location.pathname]);

  let pathnameArr = history.location.pathname.split('/');
  const selectedKeys = pathnameArr[2];
  const openKeys = pathnameArr[1];
  console.log('selectedKeys:', selectedKeys);
  console.log('openKeys:', openKeys);
  return (
    <Layouted style={{ height: '100vh' }}>
      <Header className="header" style={{ overflow: 'hidden' }}>
        <div className="logo" style={{ float: 'left' }}>
          {/* <Logo /> */}
        </div>
        <div style={{ float: 'right' }}>
          <Dropdown overlay={dropdownMenu} trigger={['click']}>
            <span
              style={{
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              {userInfo?.userName && (
                <Avatar src={`http://bpm.bbkedu.com/static/avatar/${userInfo?.userName}.png`}>
                  {userInfo && userInfo.displayName?.substr(0, 1)}
                </Avatar>
              )}
              <span style={{ padding: '0 4px' }}>{userInfo && userInfo.displayName}</span>
              <DownOutlined />
            </span>
          </Dropdown>
        </div>
      </Header>
      <Layouted>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={[selectedKeys]}
            defaultOpenKeys={[openKeys]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {route.routes.map((subMenu: any) => {
              return (
                <SubMenu key={subMenu.key} icon={<UserOutlined />} title={subMenu.name}>
                  {subMenu.routes &&
                    subMenu.routes.length > 0 &&
                    subMenu.routes.map((menu: any) => {
                      return (
                        <Menu.Item key={menu.key} onClick={() => history.push(menu.path)}>
                          {menu.name}
                        </Menu.Item>
                      );
                    })}
                </SubMenu>
              );
            })}
          </Menu>
        </Sider>
        <Layouted style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {Array.isArray(breadcrumb) &&
              breadcrumb.map((item: any) => {
                return <Breadcrumb.Item key={item.path}>{item.title}</Breadcrumb.Item>;
              })}
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: '500px',
            }}
          >
            <Card bordered={false}>{children}</Card>
          </Content>
        </Layouted>
      </Layouted>
    </Layouted>
  );
};

export default Layout;
