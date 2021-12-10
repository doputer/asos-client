import { IUser } from 'Interfaces/IUser';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { getCookie } from 'Utils/cookie';

type RetrunTypes = [IUser[], Dispatch<SetStateAction<string>>];

const useSearchUser = (name: string | null = null): RetrunTypes => {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = useCallback(
    async name => {
      if (name === null) return;

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/search?name=${name}`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${getCookie('access_token')}`,
          },
        },
      );

      const json = await response.json();
      setUsers(json);
    },
    [name],
  );

  useEffect(() => {
    fetchUsers(name);
  }, [name]);

  return [users, fetchUsers];
};

export default useSearchUser;
