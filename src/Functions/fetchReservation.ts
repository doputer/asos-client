import { IReservation } from 'Interfaces/IReservation';
import { Error } from 'Lib/Error';

type ReturnTypes = [IReservation, IReservation];

export const fetchReservation = async (
  userId: number,
): Promise<ReturnTypes> => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/search?status=1&userId=${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    },
  );

  if (response.status === 200) {
    const json = await response.json();

    const seatReservation = json.find((j: IReservation) => j.seat !== null);
    const roomReservation = json.find((j: IReservation) => j.room !== null);

    return [seatReservation, roomReservation];
  }

  const { status, message } = await response.json();

  throw new Error(status, message);
};
