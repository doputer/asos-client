import { getSearchedFacilities } from 'Apis/facilityApi';
import { getSearchedRooms } from 'Apis/roomApi';
import { getSearchedSeats } from 'Apis/seatApi';
import useAsync from 'Hooks/useAsync';
import { IFacility, IRoom, ISeat } from 'Interfaces/IArrangement';
import { IFloor } from 'Interfaces/IFloor';
import { useEffect, useState } from 'react';

type ReturnTypes = {
  loading: boolean;
  seats: ISeat[];
  rooms: IRoom[];
  facilities: IFacility[];
  refetchSeat: () => void;
  refetchRoom: () => void;
  refetchFacility: () => void;
};

const useArrangement = (floor: IFloor): ReturnTypes => {
  const [loading, setLoading] = useState(true);

  const {
    loading: loadingSeat,
    data: seats,
    execute: fetchSeat,
  } = useAsync(getSearchedSeats);
  const {
    loading: loadingRoom,
    data: rooms,
    execute: fetchRoom,
  } = useAsync(getSearchedRooms);
  const {
    loading: loadingFacility,
    data: facilities,
    execute: fetchFacility,
  } = useAsync(getSearchedFacilities);

  const refetch = (() => {
    return {
      refetchSeat: () => {
        fetchSeat(floor.id);
      },
      refetchRoom: () => {
        fetchSeat(floor.id);
      },
      refetchFacility: () => {
        fetchSeat(floor.id);
      },
    };
  })();

  useEffect(() => {
    fetchSeat(floor.id);
    fetchRoom(floor.id);
    fetchFacility(floor.id);
  }, [floor]);

  useEffect(() => {
    if (seats && rooms && facilities) setLoading(() => false);
    else setLoading(() => true);
  }, [loadingSeat, loadingRoom, loadingFacility]);

  return {
    loading,
    seats,
    rooms,
    facilities,
    ...refetch,
  };
};

export default useArrangement;
