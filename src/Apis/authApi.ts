import axios from 'axios';
import { getCookie } from 'Utils/cookie';

export const getAuth = async () => {
  const access_token = getCookie('access_token');

  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/auth`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${access_token}`,
        'Content-type': 'application/json',
      },
    },
  );

  return response.data;
};

interface ILogin {
  email: string;
  password: string;
}

export const postAuth = async (data: ILogin) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_BASE_URL}/auth`,
    data,
  );

  return response.data;
};
