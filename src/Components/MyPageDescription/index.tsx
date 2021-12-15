import {
  Avatar,
  Button,
  Card,
  Divider,
  Empty,
  Form,
  Input,
  List,
  Modal,
  Space,
  Tag,
} from 'antd';
import {
  getSearchedAllReservation,
  getSearchedReservation,
} from 'Apis/reservationApi';
import { getUser } from 'Apis/userApi';
import { SearchBoardCover } from 'Components/SearchBoardCover';
import { Spinner } from 'Components/Spin';
import useAsync from 'Hooks/useAsync';
import { IReservation } from 'Interfaces/IReservation';
import { useEffect, useState } from 'react';
import { getFormatDate } from 'Utils/moment';

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

  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

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
                    {'김 도 현 '}
                  </b>
                  님
                </span>
                <Button type="ghost" shape="round">
                  수정
                </Button>
              </Space>

              <Divider />

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
                      onClick={() => showModal()}
                    >
                      위치 보기
                    </Button>
                  </Form.Item>
                )}
                {roomReservation && (
                  <Form.Item label="회의실 위치">
                    {`${roomReservation.room.floor.name} - ${roomReservation.room.name}`}
                    <Button
                      type="ghost"
                      shape="round"
                      size="small"
                      style={{
                        marginLeft: '10px',
                      }}
                    >
                      위치 보기
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </Card>
          </div>
          <div
            style={{
              flex: '1 0 auto',
              border: '1px solid #f0f0f0',
              overflow: 'auto',
              height: '100%',
              display: 'flex',
            }}
          >
            <List
              header={<b>좌석 사용 내역</b>}
              dataSource={seatReservations}
              renderItem={(reservation: IReservation) => (
                <List.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  {`${getFormatDate(
                    reservation.startTime,
                    'YYYY-MM-DD HH:mm:ss',
                  )} ~ ${
                    reservation.endTime
                      ? getFormatDate(
                          reservation.endTime,
                          'YYYY-MM-DD HH:mm:ss',
                        )
                      : ''
                  }`}
                  <br />
                  {`${reservation.seat.name} - ${reservation.seat.floor.name}`}
                  {reservation.status === 1 && (
                    <Tag color={'#87d068'}>{'사용 중'}</Tag>
                  )}
                  {reservation.status === 2 && (
                    <Tag color={'#108ee9'}>{'사용 완료'}</Tag>
                  )}
                </List.Item>
              )}
              style={{
                flex: 1,
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
            ></List>
          </div>
          <div
            style={{
              flex: '1 0 auto',
              border: '1px solid #f0f0f0',
              overflow: 'auto',
              height: '100%',
              display: 'flex',
            }}
          >
            <List
              header={<b>회의실 예약 내역</b>}
              dataSource={roomReservations}
              renderItem={(reservation: IReservation) => (
                <List.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  {`${getFormatDate(
                    reservation.startTime,
                    'YYYY-MM-DD HH:mm:ss',
                  )} ~ ${
                    reservation.endTime
                      ? getFormatDate(
                          reservation.endTime,
                          'YYYY-MM-DD HH:mm:ss',
                        )
                      : ''
                  }`}
                  <br />
                  {`${reservation.room.name} - ${reservation.room.floor.name}`}
                  {reservation.status === 1 && (
                    <Tag color={'#87d068'}>{'사용 중'}</Tag>
                  )}
                  {reservation.status === 2 && (
                    <Tag color={'#108ee9'}>{'사용 완료'}</Tag>
                  )}
                </List.Item>
              )}
              style={{
                flex: 1,
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
            ></List>
          </div>
          {/* <div
              className="flex-center"
              style={{
                height: '100%',
              }}
            >
              <Empty
                description={
                  <>
                    <div>
                      <span style={{ color: '#4895ef' }}>좌석</span> 혹은{' '}
                      <span style={{ color: '#4895ef' }}>회의실</span>의 위치가
                    </div>
                    <div>이곳에 나타납니다.</div>
                  </>
                }
                style={{
                  margin: '36px',
                }}
              />
            </div> */}
          {seatReservation && (
            <Modal
              title={`위치 (${seatReservation.seat.floor.name} - ${seatReservation.seat.name})`}
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
              <SearchBoardCover reservation={seatReservation} />
            </Modal>
          )}
        </div>
      )}
    </>
  );
};
