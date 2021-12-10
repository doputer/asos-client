import { getSearchedFacilities } from 'Apis/facilityApi';
import { getSearchedRooms } from 'Apis/roomApi';
import { getSearchedSeats } from 'Apis/seatApi';
import { Board } from 'Components/Board';
import { Spinner } from 'Components/Spin';
import { getAuth, useUserDispatch, useUserState } from 'Contexts/UserContext';
import { drawBoard } from 'Functions/drawBoard';
import useAsync from 'Hooks/useAsync';
import { IFacility, IRoom, ISeat } from 'Interfaces/IArrangement';
import { ICol } from 'Interfaces/IBoard';
import { IFloor } from 'Interfaces/IFloor';
import { useEffect, useState } from 'react';

export const BoardContainer = ({ floor }: { floor: IFloor }) => {
  const { auth } = useUserState();
  const { data } = auth;
  const dispatch = useUserDispatch();

  useEffect(() => {
    getAuth(dispatch);
  }, [dispatch]);

  const [board, setBoard] = useState<ICol[][]>([]);

  const [seatsState, seatsRefetch] = useAsync(
    () => getSearchedSeats(floor.id),
    [floor.id],
  );
  const [roomsState] = useAsync(() => getSearchedRooms(floor.id), [floor.id]);
  const [faciliitiesState] = useAsync(
    () => getSearchedFacilities(floor.id),
    [floor.id],
  );

  const {
    loading: seatLoading,
    data: seats,
  }: { loading: boolean; data: ISeat[] } = seatsState;
  const {
    loading: roomLoading,
    data: rooms,
  }: { loading: boolean; data: IRoom[] } = roomsState;
  const {
    loading: facilityLoading,
    data: facilities,
  }: { loading: boolean; data: IFacility[] } = faciliitiesState;

  const loading = seatLoading || roomLoading || facilityLoading;

  useEffect(() => {
    if (!loading) setBoard(drawBoard(floor, seats, rooms, facilities));
  }, [loading, seats]);

  return (
    <>
      {loading ? (
        <div className="flex-center full">
          <Spinner size={72} />
        </div>
      ) : (
        <Board userId={data.id} board={board} seatsRefetch={seatsRefetch} />
      )}
    </>
  );
};
