import { ITimeTable } from 'Interfaces/ITimeTable';
import { useCallback, useEffect, useState } from 'react';

type RetrunTypes = [
  ITimeTable[],
  (roomId: number | null, date: string | null) => Promise<void>,
];

const useTimeTable = (
  roomId: number | null = null,
  date: string | null = null,
): RetrunTypes => {
  const [table, setTable] = useState<ITimeTable[]>([]);

  const fetchTimeTable = useCallback(
    async (roomId: number | null, date: string | null) => {
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
    [roomId, date],
  );

  useEffect(() => {
    fetchTimeTable(roomId, date);
  }, [roomId, date]);

  return [table, fetchTimeTable];
};

export default useTimeTable;
