import { Error } from 'Utils/error';

interface IRoomReservation {
  startTime: Date;
  endTime: Date;
  topic: string;
  userId: number;
  roomId: number;
  participantIds: number[];
}

export const fetchRoomReservation = async (data: IRoomReservation) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_BASE_URL}/reservations/room`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  if (response.status === 201) return;

  const { status, message } = await response.json();

  throw new Error(status, message);
};
