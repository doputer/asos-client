import './index.scss';

import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { RoomTable } from 'Components/RoomTable';
import { useState } from 'react';
import { RoomDetail } from 'Components/RoomDetail';

export const RoomContainer = () => {
  const [detail, setDetail] = useState(false);

  const goNext = () => setDetail(true);
  const goPrev = () => setDetail(false);

  return (
    <Layout className={`room-container pageSlider pageSlider-${status}`}>
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
          {!detail && <RoomTable goNext={goNext} />}
          {detail && <RoomDetail goPrev={goPrev} />}
        </div>
      </Content>
    </Layout>
  );
};
