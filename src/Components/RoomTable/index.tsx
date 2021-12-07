import { Table, Tag } from 'antd';
import useRooms from 'Hooks/useRooms';
import { IRoom } from 'Interfaces/IArrangement';
import { useEffect, useRef, useState } from 'react';

interface IRow {
  key: number;
  floor: string;
  name: string;
  max: string;
  tag: string;
}

export const RoomTable = ({
  handleRoom,
}: {
  handleRoom: (room: IRow) => void;
}) => {
  const [rooms] = useRooms();
  const [rows, setRows] = useState<IRow[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRows(
      rooms.map((room: IRoom): IRow => {
        return {
          key: room.id,
          floor: room.floor.name,
          name: room.name,
          max: `${room.maxUser}명`,
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
        compare: (a: IRow, b: IRow) => (a.max > b.max ? 1 : -1),
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
        columns={columns}
        dataSource={rows}
        pagination={false}
        sticky
        onRow={(record: IRow) => {
          return {
            onClick: () => handleRoom(record),
          };
        }}
        scroll={{ y: ref.current?.clientHeight }}
      />
    </div>
  );
};
