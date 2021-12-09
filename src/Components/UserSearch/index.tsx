import { Input } from 'antd';
import { UserDescription } from 'Components/UserDescription';
import { UserTable } from 'Components/UserTable';
import useSearchUser from 'Hooks/useSearchUser';
import { IUser } from 'Interfaces/IUser';
import { useState } from 'react';

export const UserSearch = () => {
  const { Search } = Input;

  const [tab, setTab] = useState(false);

  const [users, fetchUsers] = useSearchUser();
  const [user, setUser] = useState<IUser>();

  const goNext = () => setTab(true);
  const goPrev = () => setTab(false);

  return (
    <>
      <Search
        placeholder="검색하실 회원 정보를 입력해주세요."
        enterButton="검색"
        size="large"
        onSearch={(name: string) => {
          if (!name) return;
          setTab(false);

          fetchUsers(name);
        }}
        style={{
          marginBottom: '10px',
        }}
      />
      <div
        style={{
          flex: 1,
          overflow: 'auto',
        }}
      >
        {!tab && <UserTable users={users} setUser={setUser} goNext={goNext} />}
        {tab && user && <UserDescription user={user} goPrev={goPrev} />}
      </div>
    </>
  );
};
