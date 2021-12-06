import { Button, Descriptions } from 'antd';
import { fetchReservation } from 'Functions/fetchReservation';
import { IUser } from 'Interfaces/IUser';
import { useEffect, useState } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';

export const UserDescription = ({
  user,
  changeToggle,
}: {
  user: IUser;
  changeToggle: () => void;
}) => {
  const [seat, setSeat] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    (async () => {
      const { seatReservation, roomReservation } = await fetchReservation(
        user.id,
      );

      if (seatReservation)
        setSeat(
          `${seatReservation?.seat.floor.name} - ${seatReservation?.seat.name}`,
        );

      if (roomReservation)
        setRoom(
          `${roomReservation?.room.floor.name} - ${roomReservation?.room.name}`,
        );
    })();
  }, [user.id]);

  return (
    <>
      <Button
        type="default"
        shape="circle"
        icon={<ArrowLeftOutlined />}
        onClick={() => changeToggle()}
        style={{
          marginBottom: '10px',
        }}
      />
      <Descriptions title="사용자 정보" bordered column={1}>
        <Descriptions.Item label="사원번호">
          {user.employeeId}
        </Descriptions.Item>
        <Descriptions.Item label="성함">{user.name}</Descriptions.Item>
        <Descriptions.Item label="부서">{user.department}</Descriptions.Item>
        <Descriptions.Item label="직책">{user.position}</Descriptions.Item>
        <Descriptions.Item label="이메일">{user.email}</Descriptions.Item>
        <Descriptions.Item label="연락처">{user.tel}</Descriptions.Item>
        {seat && (
          <Descriptions.Item label="좌석 위치">
            <span
              style={{
                marginRight: '10px',
              }}
            >
              {seat}
            </span>
            <Button type="ghost" shape="round">
              위치 보기
            </Button>
          </Descriptions.Item>
        )}
        {room && (
          <Descriptions.Item label="회의실 위치">
            <span
              style={{
                marginRight: '10px',
              }}
            >
              {room}
            </span>
            <Button type="ghost" shape="round">
              위치 보기
            </Button>
          </Descriptions.Item>
        )}
      </Descriptions>
    </>
  );
};
