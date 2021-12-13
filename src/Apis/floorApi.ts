import axios from 'axios';

export const getFloors = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/floors`,
    {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
  );

  return response.data;
};
