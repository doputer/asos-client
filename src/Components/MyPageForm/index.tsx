import './index.scss';

import { Button, Form, Input } from 'antd';
import { IReservation } from 'Interfaces/IReservation';
import { IUser } from 'Interfaces/IUser';
import React, { useEffect } from 'react';

import { ClockCircleOutlined } from '@ant-design/icons';

export const MyPageForm = ({
  account,
  user,
  isEdit,
  seatReservation,
  roomReservation,
  setAccount,
  showSeat,
  showRoom,
  setIsSeatModalVisible,
  setIsRoomModalVisible,
}: {
  account: any;
  user: IUser;
  isEdit: boolean;
  seatReservation: IReservation | undefined;
  roomReservation: IReservation | undefined;
  setAccount: (value: any) => void;
  showSeat: () => void;
  showRoom: () => void;
  setIsSeatModalVisible: (visible: boolean) => void;
  setIsRoomModalVisible: (visible: boolean) => void;
}) => {
  useEffect(() => {
    setAccount(() => {
      return {
        employeeId: user?.employeeId,
        tel: user?.tel,
        department: user?.department,
        position: user?.position,
      };
    });
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setAccount({ ...account, [name]: value });
  };

  return (
    <Form className="mypage-form" layout="horizontal">
      <Form.Item label="이메일">
        <Input defaultValue={user?.email} disabled />
      </Form.Item>
      <Form.Item label="비밀번호">
        <Input.Password
          visibilityToggle={false}
          disabled={!isEdit}
          name="password"
          value={account.password}
          onChange={handleInput}
        />
      </Form.Item>
      <Form.Item label="사원번호">
        <Input
          disabled={!isEdit}
          name="employeeId"
          value={account.employeeId}
          onChange={handleInput}
        />
      </Form.Item>
      <Form.Item label="전화번호">
        <Input
          disabled={!isEdit}
          name="tel"
          value={account.tel}
          onChange={handleInput}
        />
      </Form.Item>
      <Form.Item label="부서">
        <Input
          disabled={!isEdit}
          name="department"
          value={account.department}
          onChange={handleInput}
        />
      </Form.Item>
      <Form.Item label="직책">
        <Input
          disabled={!isEdit}
          name="position"
          value={account.position}
          onChange={handleInput}
        />
      </Form.Item>
      {seatReservation && (
        <Form.Item label="좌석 위치">
          {`${seatReservation?.seat.floor.name} - ${seatReservation?.seat.name}`}
          <Button
            className="mypage-form-button"
            type="ghost"
            shape="round"
            onClick={() => showSeat()}
          >
            위치 보기
          </Button>
          <Button
            className="mypage-form-button"
            type="ghost"
            shape="circle"
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
              className="mypage-form-button"
              type="ghost"
              shape="round"
              onClick={() => showRoom()}
            >
              위치 보기
            </Button>
          </>
        ) : (
          '이용중인 회의실이 없습니다.'
        )}
        <Button
          className="mypage-form-button"
          type="ghost"
          shape="circle"
          onClick={() => setIsRoomModalVisible(true)}
          icon={<ClockCircleOutlined />}
        />
      </Form.Item>
    </Form>
  );
};
