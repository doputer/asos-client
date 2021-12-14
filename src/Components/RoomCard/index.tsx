import { Card } from 'antd';
import { RoomReservation } from 'Components/RoomReservation';
import { RoomTable } from 'Components/RoomTable';
import { IRoomRow } from 'Interfaces/Tables/IRoomRow';
import { useEffect, useRef, useState } from 'react';

export const RoomCard = () => {
  const [tab, setTab] = useState(false);
  const [room, setRoom] = useState<IRoomRow>();

  const handleRoom = (room: IRoomRow) => {
    setRoom(room);
    goNext();
  };

  const goNext = () => setTab(true);
  const goPrev = () => setTab(false);

  const ref = useRef<HTMLDivElement>(null);
  const [itemHeight, setItemHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setItemHeight(ref.current.clientHeight);
  }, [ref.current]);

  return (
    <Card
      className="seat-card card-cover"
      bordered
      title={<h1 className="card-title">회의실 예약</h1>}
      size="small"
      bodyStyle={{
        flex: 1,
        overflow: 'auto',
      }}
    >
      <div className="card-item" ref={ref}>
        {!tab && <RoomTable itemHeight={itemHeight} handleRoom={handleRoom} />}
        {tab && room && <RoomReservation goPrev={goPrev} room={room} />}
      </div>
    </Card>
  );
};
