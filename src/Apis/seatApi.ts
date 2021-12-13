import axios from 'axios';

export const getSearchedSeats = async (floorId: number) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/seats/search?floorId=${floorId}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
  );

  return response.data;
};
