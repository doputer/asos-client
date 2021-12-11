import React, { createContext, Dispatch, useContext, useReducer } from 'react';

/**
 * Interface
 */
type User = {
  id: number;
  name: string;
  email: string;
  role: number;
};

type State = {
  user: User | null;
};

type Action = { type: 'LOGIN'; user: User } | { type: 'LOGOUT' };

/**
 * Context
 */
const initialState = {
  user: {
    id: 0,
    name: '',
    email: '',
    role: 0,
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.user,
      };
    case 'LOGOUT':
      return {
        user: null,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
}

const UserStateContext = createContext<State>(initialState);
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
  if (!state) throw new Error('Cannot find UserProvider');

  return state;
}

export function useUserDispatch(): Dispatch<Action> {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error('Cannot find UserProvider');

  return dispatch;
}
