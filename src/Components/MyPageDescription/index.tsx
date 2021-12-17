import { Avatar, Button, Card, Divider, Empty, Space } from 'antd';
import { getAuth } from 'Apis/authApi';
import {
  getSearchedAllReservation,
  getSearchedReservation,
} from 'Apis/reservationApi';
import { getUser } from 'Apis/userApi';
import { MyPageForm } from 'Components/MyPageForm';
import { MyPageRoomModal } from 'Components/MyPageRoomModal';
import { MyPageSeatModal } from 'Components/MyPageSeatModal';
import { SearchBoardCover } from 'Components/SearchBoardCover';
import { Spinner } from 'Components/Spin';
import useAsync from 'Hooks/useAsync';
import { IReservation } from 'Interfaces/IReservation';
import { useEffect, useState } from 'react';

export const MyPageDescription = ({ userId }: { userId: number }) => {
  const { loading, data: user, execute: refetchUser } = useAsync(getUser);
  const { data: reservations, execute: refetchReservations } = useAsync(
    getSearchedReservation,
  );
  const { data: allReservations, execute: refetchAllReservations } = useAsync(
    getSearchedAllReservation,
  );

  const [seatReservation, setSeatReservation] = useState<IReservation>();
  const [roomReservation, setRoomReservation] = useState<IReservation>();

  const [seatReservations, setSeatReservations] = useState<IReservation[]>();
  const [roomReservations, setRoomReservations] = useState<IReservation[]>();

  const [isSeatPositionVisible, setIsSeatPositionVisible] = useState(false);
  const [isRoomPositionVisible, setIsRoomPositionVisible] = useState(false);

  const [isSeatModalVisible, setIsSeatModalVisible] = useState(false);
  const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);

  const showSeat = () => {
    setIsSeatPositionVisible(true);
    setIsRoomPositionVisible(false);
  };

  const showRoom = () => {
    setIsSeatPositionVisible(false);
    setIsRoomPositionVisible(true);
  };

  useEffect(() => {
    refetchUser(userId);
    refetchReservations({ status: 1, userId });
    refetchAllReservations(userId);
  }, []);

  useEffect(() => {
    if (reservations) {
      setSeatReservation(
        reservations.find(
          (reservation: IReservation) => reservation.seat !== null,
        ),
      );
      setRoomReservation(
        reservations.find(
          (reservation: IReservation) => reservation.room !== null,
        ),
      );
    }
  }, [reservations]);

  useEffect(() => {
    if (allReservations) {
      setSeatReservations(
        allReservations
          .filter((reservation: IReservation) => reservation.seat !== null)
          .reverse(),
      );
      setRoomReservations(
        allReservations
          .filter((reservation: IReservation) => reservation.room !== null)
          .reverse(),
      );
    }
  }, [allReservations]);

  const { data: me } = useAsync(getAuth, true);

  return (
    <>
      {loading && !user && !reservations !== null ? (
        <Spinner />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div
            style={{
              flex: '1 0 auto',
              minWidth: '360px',
            }}
          >
            <Card
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Space
                style={{
                  width: '100%',
                  height: 'inherit',
                  justifyContent: 'space-evenly',
                }}
              >
                <Avatar
                  size={{
                    xs: 32, // xs: 24
                    sm: 32,
                    md: 40,
                    lg: 64,
                    xl: 64, // xl: 80
                    xxl: 64, // xxl: 100
                  }}
                  src="https://i.pravatar.cc/500"
                />
                <span>
                  <b
                    style={{
                      fontSize: '1.5em',
                    }}
                  >
                    {me?.name}
                  </b>
                  님
                </span>
                <Button type="ghost" shape="round">
                  수정
                </Button>
              </Space>

              <Divider />

              <MyPageForm
                user={user}
                seatReservation={seatReservation}
                roomReservation={roomReservation}
                showSeat={showSeat}
                showRoom={showRoom}
                setIsSeatModalVisible={setIsSeatModalVisible}
                setIsRoomModalVisible={setIsRoomModalVisible}
              />
            </Card>
          </div>

          <div
            style={{
              flex: '9 0 auto',
              border: '1px solid #f0f0f0',
              overflow: 'auto',
              height: '100%',
              display: 'flex',
            }}
          >
            {isSeatPositionVisible || isRoomPositionVisible ? (
              <>
                {isSeatPositionVisible && seatReservation && (
                  <SearchBoardCover reservation={seatReservation} />
                )}
                {isRoomPositionVisible && roomReservation && (
                  <SearchBoardCover reservation={roomReservation} />
                )}
              </>
            ) : (
              <div
                className="flex-center"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <Empty
                  description={
                    <>
                      <div>
                        <span style={{ color: '#4895ef' }}>좌석</span> 혹은{' '}
                        <span style={{ color: '#4895ef' }}>회의실</span>의
                        위치가
                      </div>
                      <div>이곳에 나타납니다.</div>
                    </>
                  }
                  style={{
                    margin: '36px',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {isSeatModalVisible && (
        <MyPageSeatModal
          setVisible={setIsSeatModalVisible}
          reservations={seatReservations}
        />
      )}
      {isRoomModalVisible && (
        <MyPageRoomModal
          setVisible={setIsRoomModalVisible}
          reservations={roomReservations}
        />
      )}
    </>
  );
};
