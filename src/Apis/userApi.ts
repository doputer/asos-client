import axios from 'axios';
import { getCookie } from 'Utils/cookie';

export const getSearchedUsers = async (name = '') => {
  const access_token = getCookie('access_token');

  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/users/search?name=${name}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
  );

  return response.data;
};
