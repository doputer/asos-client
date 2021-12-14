import { SeatBoard } from 'Components/SeatBoard';
import { Spinner } from 'Components/Spin';
import useArrangement from 'Hooks/useArrangement';
import { ICol } from 'Interfaces/IBoard';
import { IFloor } from 'Interfaces/IFloor';
import { useEffect, useState } from 'react';
import { drawBoard } from 'Utils/drawBoard';

export const SeatBoardCover = ({ floor }: { floor: IFloor }) => {
  const [board, setBoard] = useState<ICol[][]>([]);

  const { loading, seats, rooms, facilities, refetchSeat } =
    useArrangement(floor);

  useEffect(() => {
    if (!loading) {
      setBoard(() => drawBoard(floor, seats, rooms, facilities));
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <div className="flex-center full">
          <Spinner size={72} />
        </div>
      ) : (
        <SeatBoard board={board} refetchSeat={refetchSeat} />
      )}
    </>
  );
};
