import './index.scss';

import { Card, Empty, Select } from 'antd';
import { getFloors } from 'Apis/floorApi';
import { BoardContainer } from 'Components/BoardContainer';
import useAsync from 'Hooks/useAsync';
import { IFloor } from 'Interfaces/IFloor';
import { useState } from 'react';

export const SeatCard = () => {
  const { Option } = Select;

  const { loading, data: floors = [] } = useAsync(getFloors, true);

  const [selectedFloor, setSelectedFloor] = useState<IFloor>();

  return (
    <Card
      className="seat-card card-cover"
      bordered
      title={<h1 className="card-title">좌석 예약</h1>}
      extra={
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
      }
      size="small"
      bodyStyle={{
        flex: 1,
      }}
    >
      {selectedFloor && (
        <div className="card-item">
          <BoardContainer floor={selectedFloor} />
        </div>
      )}
      {!selectedFloor && (
        <div className="card-item flex-center">
          <Empty
            description={
              <>
                <div>
                  <span style={{ color: '#4895ef' }}>층</span>을 선택하면
                </div>
                <div>이곳에 배치도가 나타납니다.</div>
              </>
            }
          />
        </div>
      )}
    </Card>
  );
};
