import { SearchBoard } from 'Components/SearchBoard';
import { Spinner } from 'Components/Spin';
import useArrangement from 'Hooks/useArrangement';
import { ICol } from 'Interfaces/IBoard';
import { IReservation } from 'Interfaces/IReservation';
import { useEffect, useState } from 'react';
import { drawBoard } from 'Utils/drawBoard';

export const SearchBoardCover = ({
  reservation,
}: {
  reservation: IReservation;
}) => {
  const [board, setBoard] = useState<ICol[][]>([]);

  const { loading, seats, rooms, facilities } = useArrangement(
    reservation.seat ? reservation.seat.floor : reservation.room.floor,
  );

  useEffect(() => {
    if (!loading)
      setBoard(
        drawBoard(
          reservation.seat ? reservation.seat.floor : reservation.room.floor,
          seats,
          rooms,
          facilities,
          reservation.seat ? reservation.seat : null,
          reservation.room ? reservation.room : null,
        ),
      );
  }, [loading]);

  return (
    <>
      {loading ? (
        <div
          className="flex-center"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Spinner size={36} />
        </div>
      ) : (
        <div
          style={{
            position: 'relative',
          }}
        >
          <SearchBoard board={board} />
        </div>
      )}
    </>
  );
};
