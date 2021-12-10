import { Error } from 'Utils/error';

interface ISignUp {
  email: string;
  name: string;
  password: string;
  employeeId: string;
  tel: string;
  department: string;
  position: string;
}

export const fetchSignUp = async (data: ISignUp) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
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
