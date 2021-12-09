import { Error } from 'Lib/Error';

interface IQuestion {
  title: string;
  message: string;
  userId: number;
}

export const fetchQuestion = async (data: IQuestion) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_BASE_URL}/questions`,
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
