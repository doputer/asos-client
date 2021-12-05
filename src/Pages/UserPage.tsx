import { Button, Layout, Menu, message, Space } from 'antd';
import { Logo } from 'Components/Logo';
import { MyPageContainer } from 'Components/MyPageContainer';
import { QuestionContainer } from 'Components/QuestionContainer';
import { RoomContainer } from 'Components/RoomContainer';
import { SearchContainer } from 'Components/SearchContainer';
import { SeatContainer } from 'Components/SeatContainer';
import { removeCookie } from 'Functions/cookie';
import { useState } from 'react';

import {
  AppstoreFilled,
  LogoutOutlined,
  MessageOutlined,
  ProfileFilled,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';

const UserPage = () => {
  const { Sider } = Layout;

  const [tab, setTab] = useState('1');

  const handleLogout = () => {
    removeCookie('access_token');

    message.success('로그아웃 되었습니다.', 0.5, () => {
      window.location.href = '/';
    });
  };

  return (
    <Layout style={{ height: '100%' }}>
      <Sider
        theme="light"
        breakpoint="xs"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={100}
      >
        <Menu
          theme="light"
          defaultSelectedKeys={[tab]}
          onSelect={({ key }) => {
            setTab(key);
          }}
          style={{
            height: '80%',
          }}
        >
          <Menu.Item
            key="0"
            icon={<Logo width="100%" theme="cloud" />}
            className="flex-center"
            onClick={() => {
              window.location.href = '/user';
            }}
          />
          <Menu.Divider dashed={true} />
          <Menu.Item
            key="1"
            icon={<AppstoreFilled style={{ fontSize: '24px' }} />}
            className="flex-center"
            style={{
              margin: '16px 0',
            }}
          />
          <Menu.Item
            key="2"
            icon={<ProfileFilled style={{ fontSize: '24px' }} />}
            className="flex-center"
            style={{
              margin: '16px 0',
            }}
          />
          <Menu.Item
            key="3"
            icon={<SearchOutlined style={{ fontSize: '24px' }} />}
            className="flex-center"
            style={{
              margin: '16px 0',
            }}
          />
          <Menu.Item
            key="4"
            icon={<MessageOutlined style={{ fontSize: '24px' }} />}
            className="flex-center"
            style={{
              margin: '16px 0',
            }}
          />
          <Menu.Item
            key="5"
            icon={<UserOutlined style={{ fontSize: '24px' }} />}
            className="flex-center"
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
            onClick={() => {
              handleLogout();
            }}
          >
            <LogoutOutlined />
          </Button>
        </Space>
      </Sider>
      <Layout
        style={{
          backgroundColor: '#fff',
        }}
      >
        {tab === '1' && <SeatContainer />}
        {tab === '2' && <RoomContainer />}
        {tab === '3' && <SearchContainer />}
        {tab === '4' && <QuestionContainer />}
        {tab === '5' && <MyPageContainer />}
      </Layout>
    </Layout>
  );
};

export default UserPage;
