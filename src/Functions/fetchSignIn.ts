import { Error } from 'Lib/Error';

interface ISignIn {
  email: string;
  password: string;
}

export const fetchSignIn = async (data: ISignIn) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_BASE_URL}/auth`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  if (response.status === 200) return;

  const { status, message } = await response.json();

  throw new Error(status, message);
};
