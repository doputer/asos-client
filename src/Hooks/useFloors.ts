import { IFloor } from 'Interfaces/IFloor';
import { useCallback, useEffect, useState } from 'react';

type RetrunTypes = [IFloor[]];

const useFloors = (): RetrunTypes => {
  const [data, setData] = useState<IFloor[]>([]);

  const fetchFloors = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/floors`,
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
    fetchFloors();
  }, [fetchFloors]);

  return [data];
};

export default useFloors;
