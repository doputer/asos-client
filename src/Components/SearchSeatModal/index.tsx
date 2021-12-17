import { Modal } from 'antd';
import { SearchBoardCover } from 'Components/SearchBoardCover';
import { IReservation } from 'Interfaces/IReservation';

export const SearchSeatModal = ({
  reservation,
  setVisible,
}: {
  reservation: IReservation | undefined;
  setVisible: (visible: boolean) => void;
}) => {
  const getTitle = () => {
    if (reservation?.seat)
      return `위치 (${reservation.seat.floor.name} - ${reservation.seat.name})`;
    else if (reservation?.room)
      return `위치 (${reservation.room.floor.name} - ${reservation.room.name})`;
  };

  return (
    <Modal
      title={getTitle()}
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
      {reservation && <SearchBoardCover reservation={reservation} />}
    </Modal>
  );
};
