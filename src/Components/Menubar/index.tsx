import './index.scss';

import { Button, Layout, message } from 'antd';
import { getAuth } from 'Apis/authApi';
import { Logo } from 'Components/Logo';
import useAsync from 'Hooks/useAsync';
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

const { Header } = Layout;

export const Menubar = () => {
  const navigate = useNavigate();

  const selectedMenu = (pos: string) => {
    const params = useParams();
    const path = params['*'];

    if (path === pos) return 'selected';
  };

  const handleLogout = () => {
    removeCookie('access_token');

    message.success('로그아웃 되었습니다.', 0.5, () => navigate('/'));
  };

  const { data: me } = useAsync(getAuth, true);

  return (
    <Header className="menubar">
      <div className="menu-logo flex-center">
        <Logo width="64px" theme="cloud" />
      </div>

      <div className="menu flex-center">
        <Button
          icon={<AppstoreOutlined />}
          className={`menu-item flex-center ${selectedMenu('seat')}`}
          onClick={() => navigate('/user/seat')}
        />
        <Button
          icon={<BuildOutlined />}
          className={`menu-item flex-center ${selectedMenu('room')}`}
          onClick={() => navigate('/user/room')}
        />
        <Button
          icon={<SearchOutlined />}
          className={`menu-item flex-center ${selectedMenu('search')}`}
          onClick={() => navigate('/user/search')}
        />
        <Button
          icon={<MessageOutlined />}
          className={`menu-item flex-center ${selectedMenu('question')}`}
          onClick={() => navigate('/user/question')}
        />
        <Button
          icon={<UserOutlined />}
          className={`menu-item flex-center ${selectedMenu('mypage')}`}
          onClick={() => navigate('/user/mypage')}
        />
      </div>

      <div className="menu-footer flex-center">
        <div>
          <b>{me?.name}</b>님
        </div>
        <Button
          className="logout-button"
          type="ghost"
          shape="circle"
          onClick={() => handleLogout()}
        >
          <LogoutOutlined />
        </Button>
      </div>
    </Header>
  );
};
