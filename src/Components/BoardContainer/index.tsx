import { Board } from 'Components/Board';
import { drawBoard } from 'Functions/drawBoard';
import useArrangement from 'Hooks/useArrangement';
import { ICol } from 'Interfaces/IBoard';
import { IFloor } from 'Interfaces/IFloor';
import { useEffect, useState } from 'react';

export const BoardContainer = ({ floor }: { floor: IFloor }) => {
  const [board, setBoard] = useState<ICol[][]>([]);

  const [seats, rooms, facilities] = useArrangement(floor.id);

  useEffect(() => {
    setBoard(drawBoard(floor, seats, rooms, facilities));
  }, [facilities]);

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Board board={board} setBoard={setBoard} />
    </div>
  );
};
