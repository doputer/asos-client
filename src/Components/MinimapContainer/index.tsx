import { Minimap } from 'Components/Minimap';
import useArrangement from 'Hooks/useArrangement';
import { ICol } from 'Interfaces/IBoard';
import { IReservation } from 'Interfaces/IReservation';
import { useEffect, useState } from 'react';
import { drawBoard } from 'Utils/drawBoard';

export const MinimapContainer = ({
  reservation,
}: {
  reservation: IReservation;
}) => {
  const [board, setBoard] = useState<ICol[][]>([]);

  const [loading, seats, rooms, facilities] = useArrangement(
    reservation.seat.floor.id,
  );

  useEffect(() => {
    setBoard(
      drawBoard(
        reservation.seat.floor,
        seats,
        rooms,
        facilities,
        reservation.seat,
      ),
    );
  }, [facilities]);

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Minimap board={board} />
    </div>
  );
};
