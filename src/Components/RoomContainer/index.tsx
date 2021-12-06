import './index.scss';

import { Table, Tag } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import useRooms from 'Hooks/useRooms';
import { IRoom } from 'Interfaces/IArrangement';
import { useEffect, useState } from 'react';

interface IRow {
  key: number;
  floor: string;
  name: string;
  max: number;
  tag: string;
}

export const RoomContainer = () => {
  const [rooms] = useRooms();
  const [rows, setRows] = useState<IRow[]>([]);

  useEffect(() => {
    setRows(
      rooms.map((room: IRoom): IRow => {
        return {
          key: room.id,
          floor: room.floor.name,
          name: room.name,
          max: room.maxUser,
          tag: '예약 가능',
        };
      }),
    );
  }, [rooms]);

  const columns = [
    {
      title: '층',
      dataIndex: 'floor',
    },
    {
      title: '이름',
      dataIndex: 'name',
    },
    {
      title: '인원',
      dataIndex: 'max',
      sorter: {
        compare: (a: IRow, b: IRow) => a.max - b.max,
      },
    },
    {
      title: '상태',
      dataIndex: 'tag',
      sorter: {
        compare: (a: IRow, b: IRow) => parseInt(a.tag) - parseInt(b.tag),
      },
      render: (tag: string) => (
        <Tag color="green" key={tag}>
          {tag}
        </Tag>
      ),
    },
  ];

  return (
    <Layout className="room-container">
      <Header className="container-header">
        <h1 className="header-title">회의실 예약</h1>
      </Header>
      <Content className="container-content">
        <div className="content-cover">
          <Table
            size="middle"
            tableLayout="fixed"
            columns={columns}
            dataSource={rows}
            pagination={false}
            onRow={(record: IRow) => {
              return {
                onClick: () => {
                  window.location.href = `/rooms/${record.key}`;
                },
              };
            }}
          />
        </div>
      </Content>
    </Layout>
  );
};
