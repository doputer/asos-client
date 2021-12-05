import { Select, Space } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { BoardContainer } from 'Components/BoardContainer';
import useFloors from 'Hooks/useFloors';
import { IFloor } from 'Interfaces/IFloor';
import { useState } from 'react';

export const SeatContainer = () => {
  const [floors] = useFloors();
  const [floor, setFloor] = useState();

  const { Option } = Select;

  return (
    <>
      <Header style={{ paddingLeft: 24, backgroundColor: 'transparent' }}>
        <Space
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '1.75rem',
              marginBottom: '0px',
            }}
          >
            좌석 예약
          </h1>
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
      <Content style={{ margin: '24px' }}>
        {floor && (
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              overflow: 'auto',
            }}
          >
            <BoardContainer floor={floor} />
          </div>
        )}
        {!floor && (
          <div
            className="flex-column-center"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              overflow: 'auto',
              border: '1px dashed #c2c2c2',
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: '#323232',
            }}
          >
            <div>
              <span style={{ color: '#4895ef' }}>층</span>을 선택하면
            </div>
            <div> 이곳에 좌석이 나타납니다.</div>
          </div>
        )}
      </Content>
    </>
  );
};
