import axios from 'axios';

export const getRooms = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/rooms`,
  );

  return response.data;
};

export const getSearchedRooms = async (floorId: number) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/rooms/search?floorId=${floorId}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
  );

  return response.data;
};

export const getRoomTimeTable = async ({
  roomId,
  date,
}: {
  roomId: number;
  date: string;
}) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/room/${roomId}/table?date=${date}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
  );

  return response.data;
};
