import './index.scss';

import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { RoomDetail } from 'Components/RoomDetail';
import { RoomTable } from 'Components/RoomTable';
import { useState } from 'react';

export const RoomContainer = () => {
  const [detail, setDetail] = useState(false);
  const [room, setRoom] = useState(0);

  const handleRoom = (room: any) => {
    setRoom(room);
    goNext();
  };

  const goNext = () => setDetail(true);
  const goPrev = () => setDetail(false);

  return (
    <Layout className="room-container">
      <Header className="container-header">
        <h1 className="header-title">회의실 예약</h1>
      </Header>
      <Content className="container-content">
        <div
          className="content-cover"
          style={{
            display: 'flex',
          }}
        >
          {!detail && <RoomTable handleRoom={handleRoom} />}
          {detail && <RoomDetail goPrev={goPrev} room={room} />}
        </div>
      </Content>
    </Layout>
  );
};
