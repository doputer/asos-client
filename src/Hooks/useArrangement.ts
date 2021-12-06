import { IFacility, IRoom, ISeat } from 'Interfaces/IArrangement';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

type ReturnTypes = [
  ISeat[],
  IRoom[],
  IFacility[],
  Dispatch<SetStateAction<ISeat[]>>,
  Dispatch<SetStateAction<IRoom[]>>,
  Dispatch<SetStateAction<IFacility[]>>,
];

const useArrangement = (floorId: number | null = null): ReturnTypes => {
  const [seats, setSeats] = useState<ISeat[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [facilites, setFacilities] = useState<IFacility[]>([]);

  const fetchSeats = useCallback(
    async floorId => {
      if (floorId === null) return;

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/seats/search?floorId=${floorId}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const json = await response.json();
      setSeats(json);
    },
    [floorId],
  );

  const fetchRooms = useCallback(
    async floorId => {
      if (floorId === null) return;

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/rooms/search?floorId=${floorId}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const json = await response.json();
      setRooms(json);
    },
    [floorId],
  );

  const fetchFacilities = useCallback(
    async floorId => {
      if (floorId === null) return;

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/facilities/search?floorId=${floorId}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const json = await response.json();
      setFacilities(json);
    },
    [floorId],
  );

  const fetchArrangement = useCallback(
    async (floorId: number | null) => {
      if (!floorId) return;

      await fetchSeats(floorId);
      await fetchRooms(floorId);
      await fetchFacilities(floorId);
    },
    [floorId],
  );

  useEffect(() => {
    fetchArrangement(floorId);
  }, [floorId]);

  return [seats, rooms, facilites, setSeats, setRooms, setFacilities];
};

export default useArrangement;
