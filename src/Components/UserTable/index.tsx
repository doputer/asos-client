import { Empty, Table } from 'antd';
import { Spinner } from 'Components/Spin';
import { IUser } from 'Interfaces/IUser';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface IRow {
  key: number;
  name: string;
  department: string;
  position: string;
}

export const UserTable = ({
  loading,
  users,
  setUser,
  goNext,
}: {
  loading: boolean;
  users: IUser[];
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  goNext: () => void;
}) => {
  const [rows, setRows] = useState<IRow[]>([]);

  const ref = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setTableHeight(ref.current.clientHeight);
  }, [ref.current]);

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
    <div
      ref={ref}
      style={{
        flex: 1,
        overflow: 'hidden',
      }}
    >
      <Table
        size="middle"
        tableLayout="fixed"
        loading={loading ? { indicator: <Spinner /> } : false}
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
        scroll={{ y: tableHeight - 47 }}
      />
    </div>
  );
};
