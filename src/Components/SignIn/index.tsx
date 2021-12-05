import './index.scss';

import { Button, Input, message, Space } from 'antd';
import { fetchSignIn } from 'Functions/fetchSignIn';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { setCookie } from 'Functions/cookie';

export const SignIn = () => {
  const [account, setAccount] = useState({
    email: '',
    password: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setAccount({ ...account, [name]: value });
  };

  const handleClick = async () => {
    try {
      const access_token = await fetchSignIn(account);

      setCookie('access_token', access_token, {
        path: '/',
        secure: true,
        sameSite: 'none',
      });

      message.success('로그인에 성공했습니다.', 1, () => {
        window.location.href = '/seat';
      });
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') handleClick();
  };

  return (
    <Space
      className="signin-form"
      direction="vertical"
      onKeyPress={e => {
        handleEnter(e);
      }}
    >
      <div className="flex-column-center signin-label">
        <h1 className="flex-column-center">
          로그인
          <div className="label-border"></div>
        </h1>
      </div>

      <Space className="input-container" direction="vertical">
        <Input
          size="large"
          className="signin-input"
          placeholder="이메일을 입력해주세요."
          name="email"
          value={account.email}
          onChange={handleInput}
        />
        <Input.Password
          size="large"
          className="signin-input"
          placeholder="비밀번호를 입력해주세요."
          name="password"
          value={account.password}
          onChange={handleInput}
        />
      </Space>

      <Button
        type="primary"
        size="large"
        className="signin-button"
        onClick={() => {
          handleClick();
        }}
      >
        로그인
      </Button>

      <Link to="/signup">
        <Button type="text" size="large">
          회원가입
        </Button>
      </Link>
    </Space>
  );
};
