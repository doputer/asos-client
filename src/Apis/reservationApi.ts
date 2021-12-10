import axios from 'axios';

interface ISeatReservation {
  userId: number;
  seatId: number;
}

export const postSeatReservation = async (data: ISeatReservation) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/seat`,
    data,
  );

  return response.data;
};
