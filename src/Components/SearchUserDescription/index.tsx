import { Button, Descriptions, Modal } from 'antd';
import { getSearchedReservation } from 'Apis/reservationApi';
import { SearchBoardCover } from 'Components/SearchBoardCover';
import useAsync from 'Hooks/useAsync';
import { IReservation } from 'Interfaces/IReservation';
import { IUser } from 'Interfaces/IUser';
import { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';

import { ArrowLeftOutlined } from '@ant-design/icons';

export const SearchUserDescription = ({
  user,
  goPrev,
}: {
  user: IUser;
  goPrev: () => void;
}) => {
  const [transitionState, setTransitionState] = useState(true);

  const [reservation, setReservation] = useState<IReservation>();
  const {
    loading,
    data: reservations,
    execute: refetchReservations,
  } = useAsync(getSearchedReservation);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    refetchReservations({ status: 1, userId: user.id });
  }, [user.id]);

  useEffect(() => {
    if (reservations && reservations[0]) setReservation(() => reservations[0]);
  }, [loading]);

  return (
    <Transition
      in={transitionState}
      timeout={100}
      onExited={() => setTimeout(() => goPrev(), 400)}
      appear
    >
      {state => (
        <div className={`page-slide-${state}`}>
          <Button
            type="default"
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={() => setTransitionState(!transitionState)}
            style={{
              marginBottom: '10px',
            }}
          />
          <Descriptions title="사용자 정보" bordered column={1}>
            <Descriptions.Item label="사원번호">
              {user.employeeId}
            </Descriptions.Item>
            <Descriptions.Item label="성함">{user.name}</Descriptions.Item>
            <Descriptions.Item label="부서">
              {user.department}
            </Descriptions.Item>
            <Descriptions.Item label="직책">{user.position}</Descriptions.Item>
            <Descriptions.Item label="이메일">{user.email}</Descriptions.Item>
            <Descriptions.Item label="연락처">{user.tel}</Descriptions.Item>
            {reservation?.seat && (
              <Descriptions.Item label="좌석 위치">
                <span
                  style={{
                    marginRight: '10px',
                  }}
                >
                  {`${reservation.seat.floor.name} - ${reservation.seat.name}`}
                </span>
                <Button type="ghost" shape="round" onClick={() => showModal()}>
                  위치 보기
                </Button>
              </Descriptions.Item>
            )}
            {reservation?.room && (
              <Descriptions.Item label="회의실 위치">
                <span
                  style={{
                    marginRight: '10px',
                  }}
                >
                  {`${reservation.room.floor.name} - ${reservation.room.name}`}
                </span>
                <Button type="ghost" shape="round">
                  위치 보기
                </Button>
              </Descriptions.Item>
            )}
          </Descriptions>
          {reservation?.seat && (
            <Modal
              title={`위치 (${reservation.seat.floor.name} - ${reservation.seat.name})`}
              visible={isModalVisible}
              cancelButtonProps={undefined}
              onCancel={handleCancel}
              centered
              bodyStyle={{
                overflow: 'auto',
                height: '480px',
                margin: '8px',
                padding: '0px',
              }}
              footer={null}
            >
              <SearchBoardCover reservation={reservation} />
            </Modal>
          )}
        </div>
      )}
    </Transition>
  );
};
