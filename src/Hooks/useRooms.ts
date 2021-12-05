import { useCallback, useEffect, useState } from 'react';

const useRooms = (): any => {
  const [data, setData] = useState([]);

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

  return [data, fetchRooms];
};

export default useRooms;
