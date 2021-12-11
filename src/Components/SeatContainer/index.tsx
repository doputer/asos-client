import './index.scss';

import { Empty, Select, Space } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import { getFloors } from 'Apis/floorApi';
import { BoardContainer } from 'Components/BoardContainer';
import useAsync from 'Hooks/useAsync';
import { IFloor } from 'Interfaces/IFloor';
import { useState } from 'react';

export const SeatContainer = () => {
  const { Option } = Select;

  const { loading, data: floors = [] }: { loading: boolean; data: IFloor[] } =
    useAsync(getFloors, [], true);

  const [selectedFloor, setSelectedFloor] = useState<IFloor>();

  return (
    <Layout className="seat-container">
      <Header className="container-header">
        <Space className="flex-center-vertical">
          <h1 className="header-title">좌석 예약</h1>
          <Select
            size="large"
            defaultValue="층"
            onChange={value => {
              setSelectedFloor(
                floors.find((floor: IFloor) => floor.id === parseInt(value)),
              );
            }}
            loading={loading}
          >
            {floors !== null &&
              floors.map((floor: IFloor) => (
                <Option value={floor.id} key={floor.id}>
                  {floor.name}
                </Option>
              ))}
          </Select>
        </Space>
      </Header>
      <Content className="container-content">
        {selectedFloor && (
          <div className="content-cover">
            <BoardContainer floor={selectedFloor} />
          </div>
        )}
        {!selectedFloor && (
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
