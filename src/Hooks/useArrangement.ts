import { getSearchedFacilities } from 'Apis/facilityApi';
import { getSearchedRooms } from 'Apis/roomApi';
import { getSearchedSeats } from 'Apis/seatApi';
import useAsync from 'Hooks/useAsync';
import { IFacility, IRoom, ISeat } from 'Interfaces/IArrangement';
import { IFloor } from 'Interfaces/IFloor';
import { useEffect, useState } from 'react';

type ReturnTypes = [
  boolean,
  ISeat[],
  IRoom[],
  IFacility[],
  () => void,
  () => void,
  () => void,
];

const useArrangement = (floor: IFloor): ReturnTypes => {
  const [loading, setLoading] = useState(true);

  const {
    loading: loadingSeat,
    data: seats,
    execute: refetchSeat,
  } = useAsync(() => getSearchedSeats(floor.id), [floor.id], true);
  const {
    loading: loadingRoom,
    data: rooms,
    execute: refetchRoom,
  } = useAsync(() => getSearchedRooms(floor.id), [floor.id], true);
  const {
    loading: loadingFacility,
    data: facilities,
    execute: refetchFacility,
  } = useAsync(() => getSearchedFacilities(floor.id), [floor.id], true);

  useEffect(() => {
    if (seats && rooms && facilities) setLoading(() => false);
    else setLoading(() => true);
  }, [loadingSeat, loadingRoom, loadingFacility]);

  return [
    loading,
    seats,
    rooms,
    facilities,
    refetchSeat,
    refetchRoom,
    refetchFacility,
  ];
};

export default useArrangement;
