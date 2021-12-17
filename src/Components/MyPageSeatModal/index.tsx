import { List, Modal, Tag } from 'antd';
import { IReservation } from 'Interfaces/IReservation';
import { getFormatDate } from 'Utils/moment';

export const MyPageSeatModal = ({
  setVisible,
  reservations,
}: {
  setVisible: (visible: boolean) => void;
  reservations: IReservation[] | undefined;
}) => {
  return (
    <Modal
      title={`좌석 사용 내역`}
      visible={true}
      cancelButtonProps={undefined}
      onCancel={() => setVisible(false)}
      centered
      bodyStyle={{
        overflow: 'auto',
        height: '480px',
        margin: '8px',
        padding: '0px',
      }}
      footer={null}
    >
      <List
        dataSource={reservations}
        renderItem={(reservation: IReservation) => (
          <List.Item
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {`${getFormatDate(reservation.startTime, 'YYYY-MM-DD HH:mm')} ~ ${
              reservation.endTime
                ? getFormatDate(reservation.endTime, 'YYYY-MM-DD HH:mm')
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
      />
    </Modal>
  );
};
