import axios from 'axios';
import { getCookie } from 'Utils/cookie';

export const getSearchedQuestions = async (userId: number) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/questions/search?userId=${userId}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
  );

  return response.data;
};

interface IQuestion {
  title: string;
  message: string;
}

export const postQuestion = async (data: IQuestion) => {
  const access_token = getCookie('access_token');

  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_BASE_URL}/questions`,
    data,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
  );

  return response.data;
};
