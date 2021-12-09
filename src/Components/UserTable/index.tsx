import { Empty, Table } from 'antd';
import { IUser } from 'Interfaces/IUser';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IRow {
  key: number;
  name: string;
  department: string;
  position: string;
}

export const UserTable = ({
  users,
  setUser,
  goNext,
}: {
  users: IUser[];
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  goNext: () => void;
}) => {
  const [rows, setRows] = useState<IRow[]>([]);

  useEffect(() => {
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
  }, [users]);

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
              <div>
                <span style={{ color: '#4895ef' }}>회원</span>을 검색해주세요.
              </div>
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
    />
  );
};
