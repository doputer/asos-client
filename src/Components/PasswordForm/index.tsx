import { Button, Card, Input, message } from 'antd';
import { getAuth, postAuth } from 'Apis/authApi';
import { MypageDescription } from 'Components/MyPageDescription';
import useAsync from 'Hooks/useAsync';
import React, { useEffect, useState } from 'react';

export const PasswordForm = () => {
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('tab1');

  const { data: user } = useAsync(getAuth, true);
  const { loading, error, execute: login } = useAsync(postAuth);

  useEffect(() => {
    if (error) message.error(error, 0.5);
  }, [error]);

  const handleClick = async () => {
    const result = await login({ email: user.email, password });

    if (result) setTab('tab2');
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') await handleClick();
  };

  const tabContents: {
    [tab: string]: JSX.Element;
  } = {
    tab1: (
      <Input.Group
        compact
        size="large"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Input.Password
          size="large"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => handleClick()}
          loading={loading}
        >
          제출
        </Button>
      </Input.Group>
    ),
    tab2: <MypageDescription userId={user?.id} />,
  };

  return (
    <Card
      title={`${tab === 'tab1' ? '비밀번호 확인' : '마이페이지'}`}
      headStyle={{
        color: '#fff',
        backgroundColor: '#4895ef',
      }}
      onKeyPress={e => {
        handleEnter(e);
      }}
    >
      {tabContents[tab]}
    </Card>
  );
};
