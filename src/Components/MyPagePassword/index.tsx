import { Button, Input, message } from 'antd';
import { postAuth } from 'Apis/authApi';
import useAsync from 'Hooks/useAsync';
import { IUser } from 'Interfaces/IUser';
import { useEffect, useState } from 'react';

export const MyPagePassword = ({
  user,
  goNext,
}: {
  user: IUser;
  goNext: () => void;
}) => {
  const [password, setPassword] = useState('');

  const { loading, error, execute: login } = useAsync(postAuth);

  useEffect(() => {
    if (error) message.error(error, 0.5);
  }, [error]);

  const handleClick = async () => {
    const result = await login({ email: user.email, password });

    if (result) goNext();
  };

  const handleEnter = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') await handleClick();
  };

  return (
    <div onKeyDown={e => handleEnter(e)}>
      <h3>비밀번호 확인</h3>
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
    </div>
  );
};
