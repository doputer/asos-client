import * as api from 'Apis/authApi';
import React, { createContext, Dispatch, useContext, useReducer } from 'react';

import {
  createAsyncDispatcher,
  createAsyncHandler,
  initialAsyncState,
} from '../Utils/asyncActionUtils';

/**
 * Interface
 */
interface State {
  auth: { loading: boolean; data?: string | null; error?: string | null };
}

interface Action {
  type: 'GET_AUTH' | 'GET_AUTH_SUCCESS' | 'GET_AUTH_ERROR';
  data?: string;
  error?: string;
}

/**
 * Context
 */
const initialState = {
  auth: initialAsyncState,
};

const authHandler = createAsyncHandler('GET_AUTH', 'auth');

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'GET_AUTH':
    case 'GET_AUTH_SUCCESS':
    case 'GET_AUTH_ERROR':
      return authHandler(state, action);
    default:
      throw new Error(`Unhandled action type`);
  }
}

const UserStateContext = createContext<State>({ ...initialState });
const UserDispatchContext = createContext<Dispatch<Action>>(() => null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer<(state: State, action: Action) => State>(
    reducer,
    initialState,
  );

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState(): State {
  const state = useContext(UserStateContext);
  if (!state) {
    throw new Error('Cannot find UserProvider');
  }
  return state;
}

export function useUserDispatch(): Dispatch<Action> {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find UserProvider');
  }
  return dispatch;
}

export const getAuth = createAsyncDispatcher('GET_AUTH', api.getAuth);
