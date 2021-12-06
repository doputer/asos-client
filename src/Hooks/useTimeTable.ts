import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

type RetrunTypes = [any, any];

const useTimeTable = (roomId: any = null, date: any = null): RetrunTypes => {
  const [table, setTable] = useState<any>([]);

  const fetchTimeTable = useCallback(
    async (roomId, date) => {
      if (roomId === null || date === null) return;

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/room/${roomId}/table?date=${date}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        },
      );

      const json = await response.json();
      setTable(json);
    },
    [name],
  );

  useEffect(() => {
    fetchTimeTable(roomId, date);
  }, [roomId, date]);

  return [table, fetchTimeTable];
};

export default useTimeTable;
