import axios from 'axios';
import { getCookie } from 'Utils/cookie';

interface ISeatReservation {
  seatId: number;
}

export const postSeatReservation = async (data: ISeatReservation) => {
  const access_token = getCookie('access_token');

  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/seat`,
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
