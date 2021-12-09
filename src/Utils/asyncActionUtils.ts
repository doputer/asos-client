import { Dispatch } from 'react';

/**
 * Interface
 */
interface State {
  loading: any;
  data?: any;
  error?: any;
}

interface Action {
  type: any;
  data?: any;
  error?: any;
}

/**
 * Utils
 */
export const createAsyncDispatcher = (
  type: string,
  promiseFn: (...rest: any[]) => any,
) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  async function actionHandler(dispatch: Dispatch<Action>, ...rest: any[]) {
    dispatch({ type });

    try {
      const data = await promiseFn(...rest);

      dispatch({
        type: SUCCESS,
        data,
      });
    } catch (error: any) {
      dispatch({
        type: ERROR,
        error: error,
      });
    }
  }

  return actionHandler;
};

export const initialAsyncState = {
  loading: false,
  data: null,
  error: null,
};

const loadingState = {
  loading: true,
  data: null,
  error: null,
};

const success = (data?: string): State => ({
  loading: false,
  data,
  error: null,
});

const error = (error?: string): State => ({
  loading: false,
  data: null,
  error: error,
});

export const createAsyncHandler = (type: string, key: string): any => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  const handler = (state: State, action: Action): any => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState,
        };
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data),
        };
      case ERROR:
        return {
          ...state,
          [key]: error(action.error),
        };
    }
  };

  return handler;
};
