import { SearchBoard } from 'Components/SearchBoard';
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
    reservation.seat.floor,
  );

  useEffect(() => {
    if (!loading)
      setBoard(
        drawBoard(
          reservation.seat.floor,
          seats,
          rooms,
          facilities,
          reservation.seat,
        ),
      );
  }, [loading]);

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <SearchBoard board={board} />
    </div>
  );
};
