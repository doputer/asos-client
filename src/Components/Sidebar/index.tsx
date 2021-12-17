import './index.scss';

import { Button, Layout, Menu, message, Space } from 'antd';
import { Logo } from 'Components/Logo';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { removeCookie } from 'Utils/cookie';

import {
  AppstoreOutlined,
  BuildOutlined,
  LogoutOutlined,
  MessageOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import useAsync from 'Hooks/useAsync';
import { getAuth } from 'Apis/authApi';

const { Sider } = Layout;

export const Sidebar = () => {
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

  const { data: me } = useAsync(getAuth, true);

  return (
    <Sider
      className="sidebar"
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
        broken
          ? {
              position: 'absolute',
              height: '100vh',
              zIndex: 1000,
              display: 'flex',
            }
          : {}
      }
    >
      <div className="sidebar-logo flex-center">
        <Logo width="60%" theme="cloud" />
      </div>

      <Menu
        className="sidebar-menu"
        theme="light"
        defaultSelectedKeys={defaultSelect()}
        onSelect={() => handleCollapsed(true)}
      >
        <Menu.Item
          key="1"
          icon={<AppstoreOutlined />}
          className="flex-center"
          onClick={() => navigate('/user/seat')}
        />
        <Menu.Item
          key="2"
          icon={<BuildOutlined />}
          className="flex-center"
          onClick={() => navigate('/user/room')}
        />
        <Menu.Item
          key="3"
          icon={<SearchOutlined />}
          className="flex-center"
          onClick={() => navigate('/user/search')}
        />
        <Menu.Item
          key="4"
          icon={<MessageOutlined />}
          className="flex-center"
          onClick={() => navigate('/user/question')}
        />
        <Menu.Item
          key="5"
          icon={<UserOutlined />}
          className="flex-center"
          onClick={() => navigate('/user/mypage')}
        />
      </Menu>

      <Space className="sidebar-footer flex-center" direction="vertical">
        <div>
          <b>{me?.name}</b>님
        </div>
        <Button
          className="logout-button"
          type="primary"
          size="large"
          onClick={() => handleLogout()}
        >
          <LogoutOutlined />
        </Button>
      </Space>
    </Sider>
  );
};
