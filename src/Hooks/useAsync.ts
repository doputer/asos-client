import { useCallback, useEffect, useReducer } from 'react';

const initialState = { loading: false, data: null, error: false };

const wait = (delay: number) =>
  new Promise(resolve => setTimeout(resolve, delay));

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const useAsync = (
  callback: (...args: any) => Promise<any>,
  immediate = false,
): any => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const execute = useCallback(
    async (...args: any) => {
      dispatch({ type: 'LOADING' });

      // await wait(500);

      try {
        const data = await callback(...args);
        dispatch({ type: 'SUCCESS', data });
        return true;
      } catch (error: any) {
        const { message } = error.response.data;
        dispatch({ type: 'ERROR', error: message });
      }
    },
    [callback],
  );

  useEffect(() => {
    immediate && execute();
    return () => dispatch({ type: 'CLEAR' });
  }, [immediate, execute]);

  return { ...state, execute };
};

export default useAsync;
