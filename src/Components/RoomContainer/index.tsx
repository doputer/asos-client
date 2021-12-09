import './index.scss';

import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { RoomReservation } from 'Components/RoomReservation';
import { RoomTable } from 'Components/RoomTable';
import { IRoomRow } from 'Interfaces/Tables/IRoomRow';
import { useState } from 'react';

export const RoomContainer = () => {
  const [tab, setTab] = useState(false);
  const [room, setRoom] = useState<any>();

  const handleRoom = (room: IRoomRow) => {
    setRoom(room);
    goNext();
  };

  const goNext = () => setTab(true);
  const goPrev = () => setTab(false);

  return (
    <Layout className="room-container">
      <Header className="container-header">
        <h1 className="header-title">회의실 예약</h1>
      </Header>
      <Content className="container-content">
        <div className="content-cover">
          {!tab && <RoomTable handleRoom={handleRoom} />}
          {tab && <RoomReservation goPrev={goPrev} room={room} />}
        </div>
      </Content>
    </Layout>
  );
};
