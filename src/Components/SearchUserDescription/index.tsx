import { Button, Descriptions } from 'antd';
import { SearchSeatModal } from 'Components/SearchSeatModal';
import { IReservation } from 'Interfaces/IReservation';
import { IUser } from 'Interfaces/IUser';
import { useState } from 'react';
import { Transition } from 'react-transition-group';

import { ArrowLeftOutlined } from '@ant-design/icons';

export const SearchUserDescription = ({
  user,
  seatReservation,
  roomReservation,
  goPrev,
}: {
  user: IUser;
  seatReservation: IReservation | undefined;
  roomReservation: IReservation | undefined;
  goPrev: () => void;
}) => {
  const [transitionState, setTransitionState] = useState(true);

  const [isSeatVisible, setSeatVisible] = useState(false);
  const [isRoomVisible, setRoomVisible] = useState(false);

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
            {seatReservation && (
              <Descriptions.Item label="좌석 위치">
                <span
                  style={{
                    marginRight: '10px',
                  }}
                >
                  {`${seatReservation.seat.floor.name} - ${seatReservation.seat.name}`}
                </span>
                <Button
                  type="ghost"
                  shape="round"
                  onClick={() => setSeatVisible(true)}
                >
                  위치 보기
                </Button>
              </Descriptions.Item>
            )}
            {roomReservation && (
              <Descriptions.Item label="회의실 위치">
                <span
                  style={{
                    marginRight: '10px',
                  }}
                >
                  {`${roomReservation.room.floor.name} - ${roomReservation.room.name}`}
                </span>
                <Button
                  type="ghost"
                  shape="round"
                  onClick={() => setRoomVisible(true)}
                >
                  위치 보기
                </Button>
              </Descriptions.Item>
            )}
          </Descriptions>
          {isSeatVisible && (
            <SearchSeatModal
              reservation={seatReservation}
              setVisible={setSeatVisible}
            />
          )}
          {isRoomVisible && (
            <SearchSeatModal
              reservation={roomReservation}
              setVisible={setRoomVisible}
            />
          )}
        </div>
      )}
    </Transition>
  );
};
