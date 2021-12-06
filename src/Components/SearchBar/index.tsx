import { Input } from 'antd';
import { UserDescription } from 'Components/UserDescription';
import { UserTable } from 'Components/UserTable';
import useSearchUser from 'Hooks/useSearchUser';
import { IUser } from 'Interfaces/IUser';
import { useState } from 'react';

export const SearchBar = () => {
  const { Search } = Input;

  const [toggle, setToggle] = useState(false);

  const [users, fetchUsers] = useSearchUser();
  const [user, setUser] = useState<IUser>();

  const changeToggle = () => setToggle(!toggle);

  return (
    <>
      <Search
        placeholder="검색하실 회원 정보를 입력해주세요."
        enterButton="검색"
        size="large"
        onSearch={(name: string) => {
          if (!name) return;

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
        {!toggle && (
          <UserTable
            users={users}
            setUser={setUser}
            changeToggle={changeToggle}
          />
        )}
        {toggle && user && (
          <UserDescription user={user} changeToggle={changeToggle} />
        )}
      </div>
    </>
  );
};
