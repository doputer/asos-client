import { Button, Form, Input } from 'antd';
import { IReservation } from 'Interfaces/IReservation';
import { IUser } from 'Interfaces/IUser';

import { ClockCircleOutlined } from '@ant-design/icons';

export const MyPageForm = ({
  user,
  seatReservation,
  roomReservation,
  showSeat,
  showRoom,
  setIsSeatModalVisible,
  setIsRoomModalVisible,
}: {
  user: IUser;
  seatReservation: IReservation | undefined;
  roomReservation: IReservation | undefined;
  showSeat: () => void;
  showRoom: () => void;
  setIsSeatModalVisible: (visible: boolean) => void;
  setIsRoomModalVisible: (visible: boolean) => void;
}) => {
  return (
    <Form layout="horizontal">
      <Form.Item label="이메일">
        <Input defaultValue={user?.email} disabled />
      </Form.Item>
      <Form.Item label="비밀번호">
        <Input.Password
          visibilityToggle={false}
          defaultValue={'00000000'}
          disabled
        />
      </Form.Item>
      <Form.Item label="비밀번호 확인">
        <Input.Password
          visibilityToggle={false}
          defaultValue={'00000000'}
          disabled
        />
      </Form.Item>
      <Form.Item label="사원번호">
        <Input defaultValue={user?.employeeId} disabled />
      </Form.Item>
      <Form.Item label="전화번호">
        <Input defaultValue={user?.tel} disabled />
      </Form.Item>
      <Form.Item label="부서">
        <Input defaultValue={user?.department} disabled />
      </Form.Item>
      <Form.Item label="직책">
        <Input defaultValue={user?.position} disabled />
      </Form.Item>
      {seatReservation && (
        <Form.Item label="좌석 위치">
          {`${seatReservation?.seat.floor.name} - ${seatReservation?.seat.name}`}
          <Button
            type="ghost"
            shape="round"
            style={{
              marginLeft: '10px',
            }}
            onClick={() => showSeat()}
          >
            위치 보기
          </Button>
          <Button
            type="ghost"
            shape="circle"
            style={{
              marginLeft: '10px',
            }}
            onClick={() => setIsSeatModalVisible(true)}
            icon={<ClockCircleOutlined />}
          />
        </Form.Item>
      )}
      <Form.Item label="회의실 위치">
        {roomReservation ? (
          <>
            {`${roomReservation.room.floor.name} - ${roomReservation.room.name}`}
            <Button
              type="ghost"
              shape="round"
              style={{
                marginLeft: '10px',
              }}
              onClick={() => showRoom()}
            >
              위치 보기
            </Button>
          </>
        ) : (
          '이용중인 회의실이 없습니다.'
        )}
        <Button
          type="ghost"
          shape="circle"
          style={{
            marginLeft: '10px',
          }}
          onClick={() => setIsRoomModalVisible(true)}
          icon={<ClockCircleOutlined />}
        />
      </Form.Item>
    </Form>
  );
};
