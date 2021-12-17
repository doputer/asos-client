import axios from 'axios';
import { getCookie } from 'Utils/cookie';

export const getUser = async (userId: number) => {
  const access_token = getCookie('access_token');

  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/users/${userId}`,
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

interface ISignUp {
  email: string;
  name: string;
  password: string;
  employeeId: string;
  tel: string;
  department: string;
  position: string;
}

export const postUser = async (data: ISignUp) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
  );

  return response.data;
};

interface IUser {
  password?: string;
  employeeId?: string;
  tel?: string;
  department?: string;
  position?: string;
}

export const patchUser = async (userId: number, data: IUser) => {
  const access_token = getCookie('access_token');

  const response = await axios.patch(
    `${process.env.REACT_APP_SERVER_BASE_URL}/users/${userId}`,
    data,
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
