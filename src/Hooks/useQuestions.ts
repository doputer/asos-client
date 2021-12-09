import { IQuestion } from 'Interfaces/IQuestion';
import { useCallback, useEffect, useState } from 'react';

type RetrunTypes = [IQuestion[], (userId: number) => Promise<void>];

const useQuestions = (userId: number): RetrunTypes => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const fetchQuestions = useCallback(async userId => {
    if (userId === undefined) return;

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/questions/search?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    const json = await response.json();

    setQuestions(json);
  }, []);

  useEffect(() => {
    fetchQuestions(userId);
  }, [fetchQuestions]);

  return [questions, fetchQuestions];
};

export default useQuestions;
