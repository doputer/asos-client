import { getSearchedFacilities } from 'Apis/facilityApi';
import { getSearchedRooms } from 'Apis/roomApi';
import { getSearchedSeats } from 'Apis/seatApi';
import { IFacility, IRoom, ISeat } from 'Interfaces/IArrangement';

import useAsync from './useAsync';

type ReturnTypes = [boolean, ISeat[], IRoom[], IFacility[], () => void];

const useArrangement = (floorId: number): ReturnTypes => {
  const [seatsState, refreshSeats] = useAsync(
    () => getSearchedSeats(floorId),
    [floorId],
  );
  const [roomsState, refreshRooms] = useAsync(
    () => getSearchedRooms(floorId),
    [floorId],
  );
  const [facilitiesState, refreshFacilities] = useAsync(
    () => getSearchedFacilities(floorId),
    [floorId],
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
  }: { loading: boolean; data: IFacility[] } = facilitiesState;

  const loading = seatLoading && roomLoading && facilityLoading;
  const refreshArrangement = () => {
    refreshSeats();
    refreshRooms();
    refreshFacilities();
  };

  return [loading, seats, rooms, facilities, refreshArrangement];
};

export default useArrangement;
