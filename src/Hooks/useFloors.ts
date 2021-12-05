import { useCallback, useEffect, useState } from 'react';

const useFloors = (): any => {
  const [data, setData] = useState([]);

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

  return [data, fetchFloors];
};

export default useFloors;
