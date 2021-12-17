import {
  EMPTY,
  FACILITY,
  RESERVED_SEAT,
  ROOM,
  SEARCH_ROOM,
  SEARCH_SEAT,
  SEAT,
} from 'Constants/object-type';
import { IFacility, IRoom, ISeat } from 'Interfaces/IArrangement';
import { ICol } from 'Interfaces/IBoard';
import { IFloor } from 'Interfaces/IFloor';

export const drawBoard = (
  floor: IFloor,
  seats: ISeat[],
  rooms: IRoom[],
  facilities: IFacility[],
  findSeat: ISeat | null = null,
  findRoom: IRoom | null = null,
) => {
  let board = Array.from({ length: floor.height }, () =>
    Array.from({ length: floor.width }, () => {
      return { type: EMPTY, id: -1, name: '', width: 1, height: 1 };
    }),
  );

  for (const seat of seats) {
    if (seat.reservations.length === 0)
      board[seat.y][seat.x] = {
        type: SEAT,
        id: seat.id,
        name: seat.name,
        width: 1,
        height: 1,
      };
    else {
      board[seat.y][seat.x] = {
        type:
          seat.x === findSeat?.x && seat.y === findSeat?.y
            ? SEARCH_SEAT
            : RESERVED_SEAT,
        id: seat.id,
        name: seat.reservations[0].user.name,
        width: 1,
        height: 1,
      };
    }
  }

  for (const room of rooms) {
    board[room.y][room.x] = {
      type: ROOM,
      id: room.id,
      name: room.name,
      width: room.width,
      height: room.height,
    };

    board = board.map((row: ICol[], rowIndex: number) =>
      row.map((col: ICol, colIndex: number) => {
        if (colIndex === findRoom?.x && rowIndex === findRoom?.y)
          return {
            type: SEARCH_ROOM,
            id: findRoom.id,
            name: findRoom.name,
            width: findRoom.width,
            height: findRoom.height,
          };

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
    board[facility.y][facility.x] = {
      type: FACILITY,
      id: facility.id,
      name: `/images/${facility.type}.png`,
      width: 1,
      height: 1,
    };
  }

  return board;
};
