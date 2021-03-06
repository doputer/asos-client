import axios from 'axios';
import { getCookie } from 'Utils/cookie';

export const getSearchedAllReservation = async (userId: number) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/search?userId=${userId}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
  );

  return response.data;
};

interface IReservation {
  status: number;
  userId: number;
}

export const getSearchedReservation = async (data: IReservation) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/search?status=${data.status}&userId=${data.userId}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
  );

  return response.data;
};

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

interface IRoomReservation {
  startTime: Date;
  endTime: Date;
  topic: string;
  roomId: number;
  participantIds: number[];
}

export const postRoomReservation = async (data: IRoomReservation) => {
  const access_token = getCookie('access_token');

  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/room`,
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
