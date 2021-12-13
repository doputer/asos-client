import { Table } from 'antd';
import { getRooms } from 'Apis/roomApi';
import { Spinner } from 'Components/Spin';
import useAsync from 'Hooks/useAsync';
import { IRoom } from 'Interfaces/IArrangement';
import { IRoomRow } from 'Interfaces/Tables/IRoomRow';
import { useEffect, useRef, useState } from 'react';

export const RoomTable = ({
  handleRoom,
}: {
  handleRoom: (room: IRoomRow) => void;
}) => {
  const { loading, data: rooms = [] } = useAsync(getRooms, true);
  const [rows, setRows] = useState<IRoomRow[]>([]);

  const ref = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setTableHeight(ref.current.clientHeight);
  }, [ref.current]);

  useEffect(() => {
    rooms &&
      setRows(
        rooms.map((room: IRoom): IRoomRow => {
          return {
            key: room.id,
            floor: room.floor.name,
            name: room.name,
            max: `${room.maxUser}명`,
          };
        }),
      );
  }, [loading]);

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
        compare: (a: IRoomRow, b: IRoomRow) => (a.max > b.max ? 1 : -1),
      },
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
        onRow={(record: IRoomRow) => {
          return {
            onClick: () => handleRoom(record),
          };
        }}
        scroll={{ y: tableHeight - 47 }}
      />
    </div>
  );
};
