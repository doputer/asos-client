import { Minimap } from 'Components/Minimap';
import { drawBoard } from 'Functions/drawBoard';
import useArrangement from 'Hooks/useArrangement';
import { ICol } from 'Interfaces/IBoard';
import { IReservation } from 'Interfaces/IReservation';
import { useEffect, useState } from 'react';

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
