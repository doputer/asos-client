import {
  EMPTY,
  FACILITY,
  RESERVED_SEAT,
  ROOM,
  SEARCH_SEAT,
  SEAT,
} from 'Constants/object-type';
import { ICol } from 'Interfaces/IBoard';

export const SearchBoard = ({ board }: { board: ICol[][] }): JSX.Element => {
  const transformLength = (type: number, length: number) => {
    if (type === ROOM) {
      if (length === 0) return `0px`;
      else return `${length * 50 + 10 * (length - 1)}px`;
    } else return `${length * 50}px`;
  };

  const itemStyle = (type: number) => {
    if (type === SEARCH_SEAT)
      return { backgroundColor: '#eb6767', color: '#fff', borderRadius: '4px' };

    if (type === EMPTY || type === FACILITY)
      return { backgroundColor: '#f5f5f5', borderRadius: '4px' };
    else if (type === SEAT)
      return {
        backgroundColor: '#51bf60',
        color: '#fff',
        borderRadius: '4px',
      };
    else if (type === ROOM)
      return {
        backgroundColor: '#E5E5E5',
        borderRadius: '4px',
      };
    else if (type === RESERVED_SEAT)
      return {
        backgroundColor: '#a0a0a0',
        color: '#fff',
        borderRadius: '4px',
      };
  };

  const facilityStyle = { width: '100%', height: '100%', opacity: '60%' };

  return (
    <>
      {board.map((row: ICol[], y: number) =>
        row.map((col: ICol, x: number) => {
          return (
            <div
              key={x + y * row.length}
              className="flex-center"
              style={{
                ...itemStyle(col.type),
                position: 'absolute',
                width: transformLength(col.type, col.width),
                height: transformLength(col.type, col.height),
                left: `${x * 50 + 10 * x}px`,
                top: `${y * 50 + 10 * y}px`,
              }}
            >
              {col.type === FACILITY ? (
                <img style={facilityStyle} src={col.name} alt="" />
              ) : col.type !== FACILITY ? (
                col.name
              ) : null}
            </div>
          );
        }),
      )}
    </>
  );
};
