import './index.scss';

import { Empty, Select, Space } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { BoardContainer } from 'Components/BoardContainer';
import useFloors from 'Hooks/useFloors';
import { IFloor } from 'Interfaces/IFloor';
import { useState } from 'react';

export const SeatContainer = () => {
  const { Option } = Select;

  const [floors] = useFloors();
  const [floor, setFloor] = useState<IFloor>();

  return (
    <Layout className="seat-container">
      <Header className="container-header">
        <Space className="flex-center-vertical">
          <h1 className="header-title">좌석 예약</h1>
          <Select
            size="large"
            defaultValue="층"
            onChange={value => {
              setFloor(
                floors.find((floor: IFloor) => floor.id === parseInt(value)),
              );
            }}
          >
            {floors.map((floor: IFloor) => (
              <Option value={floor.id} key={floor.id}>
                {floor.name}
              </Option>
            ))}
          </Select>
        </Space>
      </Header>
      <Content className="container-content">
        {floor && (
          <div className="content-cover">
            <BoardContainer floor={floor} />
          </div>
        )}
        {!floor && (
          <div className="content-cover-empty flex-column-center">
            <Empty
              description={
                <>
                  <div>
                    <span style={{ color: '#4895ef' }}>층</span>을 선택하면
                  </div>
                  <div> 이곳에 배치도가 나타납니다.</div>
                </>
              }
            />
          </div>
        )}
      </Content>
    </Layout>
  );
};
