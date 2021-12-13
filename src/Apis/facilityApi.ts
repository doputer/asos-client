import axios from 'axios';

export const getSearchedFacilities = async (floorId: number) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/facilities/search?floorId=${floorId}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
  );

  return response.data;
};
