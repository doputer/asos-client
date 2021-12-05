import { message } from 'antd';
import { Board } from 'Components/Board';
import {
  EMPTY,
  FACILITY,
  RESERVED_SEAT,
  ROOM,
  SEAT,
} from 'Constants/object-type';
import useSearchFacilites from 'Hooks/useSearchFacilities';
import useSearchRooms from 'Hooks/useSearchRooms';
import useSearchSeats from 'Hooks/useSearchSeats';
import { IFloor } from 'Interfaces/IFloor';
import { useEffect, useState } from 'react';

export const BoardContainer = ({ floor }: { floor: IFloor }) => {
  const [board, setBoard] = useState<any>([]);

  const [seats]: any = useSearchSeats(floor.id);
  const [rooms]: any = useSearchRooms(floor.id);
  const [facilities]: any = useSearchFacilites(floor.id);

  useEffect(() => {
    message.info('좌석을 선택해주세요.', 1);
  }, [floor]);

  useEffect(() => {
    let newBoard = Array.from({ length: floor.height }, () =>
      Array.from({ length: floor.width }, () => {
        return { type: EMPTY, id: -1, name: '', width: 1, height: 1 };
      }),
    );

    for (const seat of seats) {
      if (seat.reservations.length === 0)
        newBoard[seat.y][seat.x] = {
          type: SEAT,
          id: seat.id,
          name: seat.name,
          width: 1,
          height: 1,
        };
      else {
        newBoard[seat.y][seat.x] = {
          type: RESERVED_SEAT,
          id: seat.id,
          name: seat.reservations[0].user.name,
          width: 1,
          height: 1,
        };
      }
    }

    for (const room of rooms) {
      newBoard[room.y][room.x] = {
        type: ROOM,
        id: room.id,
        name: room.name,
        width: room.width,
        height: room.height,
      };

      newBoard = newBoard.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          if (colIndex === room.x && rowIndex === room.y)
            return {
              type: ROOM,
              id: room.id,
              name: room.name,
              width: room.width,
              height: room.height,
            };
          else if (colIndex >= room.x && colIndex < room.x + room.width)
            if (rowIndex >= room.y && rowIndex < room.y + room.height)
              return { ...col, width: 0, height: 0 };

          return col;
        }),
      );
    }

    for (const facility of facilities) {
      newBoard[facility.y][facility.x] = {
        type: FACILITY,
        id: facility.id,
        name: `/images/${facility.type}.png`,
        width: 1,
        height: 1,
      };
    }

    setBoard(newBoard);
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
