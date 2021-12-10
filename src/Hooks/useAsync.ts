import { useEffect, useReducer } from 'react';

function reducer(state: any, action: any) {
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
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAsync(callback: () => any, deps: any[] = [], skip = false): any {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: null,
    error: false,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });

    setTimeout(async () => {
      try {
        const data = await callback();

        dispatch({ type: 'SUCCESS', data });
      } catch (error: any) {
        dispatch({ type: 'ERROR', error });
      }
    }, 100);
  };

  useEffect(() => {
    if (skip) return;

    fetchData();
  }, deps);

  return [state, fetchData];
}

export default useAsync;
