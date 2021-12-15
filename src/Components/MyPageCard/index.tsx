import { Card } from 'antd';
import { getAuth } from 'Apis/authApi';
import { MyPageDescription } from 'Components/MyPageDescription';
import { MyPagePassword } from 'Components/MyPagePassword';
import useAsync from 'Hooks/useAsync';
import { useState } from 'react';

export const MyPageCard = () => {
  const [tab, setTab] = useState(0);

  const { data: user } = useAsync(getAuth, true);

  const goNext = () => setTab(1);

  return (
    <Card
      className="seat-card card-cover"
      bordered
      title={<h1 className="card-title">마이페이지</h1>}
      size="small"
      bodyStyle={{
        flex: 1,
        overflow: 'auto',
      }}
    >
      <div
        className="flex-center"
        style={{
          height: '100%',
        }}
      >
        {tab === 0 && <MyPagePassword user={user} goNext={goNext} />}
        {tab === 1 && <MyPageDescription userId={user.id} />}
      </div>
    </Card>
  );
};
