import { Empty, Table } from 'antd';
import { IUser } from 'Interfaces/IUser';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IRow {
  key: number;
  name: string;
  department: string;
  position: string;
}

export const SearchUserTable = ({
  itemHeight,
  loading,
  users,
  setUser,
  goNext,
}: {
  itemHeight: number;
  loading: boolean;
  users: IUser[];
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  goNext: () => void;
}) => {
  const [rows, setRows] = useState<IRow[]>([]);

  useEffect(() => {
    if (users)
      setRows(
        users.map((user: IUser): IRow => {
          return {
            key: user.id,
            name: user.name,
            department: user.department,
            position: user.position,
          };
        }),
      );
  }, [loading]);

  const columns = [
    {
      title: '이름',
      dataIndex: 'name',
    },
    {
      title: '부서',
      dataIndex: 'department',
    },
    {
      title: '직책',
      dataIndex: 'position',
    },
  ];

  return (
    <Table
      size="middle"
      tableLayout="fixed"
      columns={columns}
      dataSource={rows}
      pagination={false}
      sticky
      locale={{
        emptyText: (
          <Empty
            description={
              <>
                <span style={{ color: '#4895ef' }}>회원</span>을 검색해주세요.
              </>
            }
          />
        ),
      }}
      onRow={(record: IRow) => {
        return {
          onClick: () => {
            setUser(users.find(user => user.id === record.key));
            goNext();
          },
        };
      }}
      scroll={{ y: itemHeight - 47 }}
    />
  );
};
