import { Input } from 'antd';
import { getSearchedUsers } from 'Apis/userApi';
import { UserDescription } from 'Components/UserDescription';
import { UserTable } from 'Components/UserTable';
import useAsync from 'Hooks/useAsync';
import { IUser } from 'Interfaces/IUser';
import { useState } from 'react';

export const UserSearch = () => {
  const { Search } = Input;

  const [tab, setTab] = useState(false);

  const {
    loading,
    data: users = [],
    execute: refetchUsers,
  }: {
    loading: boolean;
    data: IUser[];
    execute: (name: string) => void;
  } = useAsync(getSearchedUsers);
  const [user, setUser] = useState<IUser>();

  const goNext = () => setTab(true);
  const goPrev = () => setTab(false);

  return (
    <>
      {!tab && (
        <>
          <Search
            placeholder="검색하실 회원 정보를 입력해주세요."
            enterButton="검색"
            size="large"
            onSearch={(name: string) => {
              if (!name) return;
              setTab(false);

              refetchUsers(name);
            }}
            style={{
              marginBottom: '10px',
            }}
          />
          <UserTable
            loading={loading}
            users={users}
            setUser={setUser}
            goNext={goNext}
          />
        </>
      )}
      {tab && user && <UserDescription user={user} goPrev={goPrev} />}
    </>
  );
};
