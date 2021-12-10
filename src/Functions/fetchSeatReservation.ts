import { Error } from 'Utils/error';

interface ISeatReservation {
  userId: number;
  seatId: number;
}

export const fetchSeatReservation = async (data: ISeatReservation) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/seat`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  if (response.status === 201) {
    const json = await response.json();

    return { seat: json.seat, user: json.user };
  }

  const { status, message } = await response.json();

  throw new Error(status, message);
};
