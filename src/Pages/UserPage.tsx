import { Button, Layout, Menu, message, Space } from 'antd';
import { Logo } from 'Components/Logo';
import { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { removeCookie } from 'Utils/cookie';

import {
  AppstoreOutlined,
  BuildOutlined,
  LogoutOutlined,
  MessageOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';

const UserPage = () => {
  const { Sider } = Layout;

  const navigate = useNavigate();

  const defaultSelect = () => {
    const params = useParams();
    const path = params['*'];

    if (path === 'seat') return ['1'];
    else if (path === 'room') return ['2'];
    else if (path === 'search') return ['3'];
    else if (path === 'question') return ['4'];
    else if (path === 'mypage') return ['5'];
  };

  const [collapsed, setCollapsed] = useState(false);
  const [broken, setBroken] = useState(true);

  const handleCollapsed = (collapsed: boolean) => {
    if (!broken) return;

    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    removeCookie('access_token');

    message.success('로그아웃 되었습니다.', 0.5, () => navigate('/'));
  };

  return (
    <Layout style={{ height: '100%' }}>
      <Sider
        theme="light"
        breakpoint="xs"
        collapsedWidth="0"
        onBreakpoint={broken => {
          setBroken(broken);
        }}
        onCollapse={collapsed => {
          handleCollapsed(collapsed);
        }}
        collapsed={collapsed}
        width={100}
        style={
          broken ? { position: 'absolute', height: '100vh', zIndex: 1000 } : {}
        }
      >
        <Menu
          theme="light"
          defaultSelectedKeys={defaultSelect()}
          onSelect={() => handleCollapsed(true)}
          style={{
            height: '80%',
          }}
        >
          <Menu.Item
            key="0"
            icon={<Logo width="100%" theme="cloud" />}
            className="flex-center"
          />
          <Menu.Divider dashed={true} />
          <Menu.Item
            key="1"
            icon={<AppstoreOutlined style={{ fontSize: '24px' }} />}
            className="flex-center"
            onClick={() => navigate('/user/seat')}
            style={{
              margin: '16px 0',
            }}
          />
          <Menu.Item
            key="2"
            icon={<BuildOutlined style={{ fontSize: '24px' }} />}
            className="flex-center"
            onClick={() => navigate('/user/room')}
            style={{
              margin: '16px 0',
            }}
          />
          <Menu.Item
            key="3"
            icon={<SearchOutlined style={{ fontSize: '24px' }} />}
            className="flex-center"
            onClick={() => navigate('/user/search')}
            style={{
              margin: '16px 0',
            }}
          />
          <Menu.Item
            key="4"
            icon={<MessageOutlined style={{ fontSize: '24px' }} />}
            className="flex-center"
            onClick={() => navigate('/user/question')}
            style={{
              margin: '16px 0',
            }}
          />
          <Menu.Item
            key="5"
            icon={<UserOutlined style={{ fontSize: '24px' }} />}
            className="flex-center"
            onClick={() => navigate('/user/mypage')}
            style={{
              margin: '16px 0',
            }}
          />
        </Menu>

        <Space
          className="flex-center"
          direction="vertical"
          style={{
            width: '100%',
            height: '20%',
            borderRight: '1px solid #f0f0f0',
            color: '#fff',
            backgroundColor: '#4895ef',
          }}
        >
          <div>
            <b>김도현</b>님
          </div>
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
            }}
            onClick={() => handleLogout()}
          >
            <LogoutOutlined />
          </Button>
        </Space>
      </Sider>

      <Outlet />
    </Layout>
  );
};

export default UserPage;
