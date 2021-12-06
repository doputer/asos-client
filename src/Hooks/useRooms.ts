import { IRoom } from 'Interfaces/IArrangement';
import { useCallback, useEffect, useState } from 'react';

type RetrunTypes = [IRoom[]];

const useRooms = (): RetrunTypes => {
  const [data, setData] = useState<IRoom[]>([]);

  const fetchRooms = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/rooms`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    const json = await response.json();

    setData(json);
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return [data];
};

export default useRooms;
