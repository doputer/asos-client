import './index.scss';

import { Button, Input, message, Space } from 'antd';
import { postAuth } from 'Apis/authApi';
import useAsync from 'Hooks/useAsync';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setCookie } from 'Utils/cookie';

export const SignIn = () => {
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    email: '',
    password: '',
  });
  const { error, data, execute: login } = useAsync(postAuth);

  useEffect(() => {
    if (error) message.error(error, 0.5);
  }, [error]);

  useEffect(() => {
    if (data) {
      const { access_token } = data;

      setCookie('access_token', access_token, {
        path: '/',
        secure: true,
        sameSite: 'none',
      });
    }
  }, [data]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handleClick = async () => {
    const result = await login(account);

    if (result)
      message.success('로그인 되었습니다.', 0.5, () => {
        navigate('/user/seat');
      });
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') await handleClick();
  };

  return (
    <div
      className="signin-form flex-column-center"
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

      <div
        className="input-container flex-column"
        style={{
          width: '100%',
          gap: '10px',
        }}
      >
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
      </div>

      <Button
        type="primary"
        size="large"
        className="signin-button"
        onClick={() => handleClick()}
      >
        로그인
      </Button>

      <Link to="/signup">
        <Button type="text" size="large" className="signin-button">
          회원가입
        </Button>
      </Link>
    </div>
  );
};
