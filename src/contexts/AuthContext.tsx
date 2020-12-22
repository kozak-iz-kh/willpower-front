import React, { createContext, useContext, useReducer } from "react";

type State = {
  isLogedIn: boolean;
};

type LoginAction = {
  type: "login";
};

type Actions = LoginAction;

type Dispatch = (action: Actions) => void;

const authReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "login": {
      return { ...state, isLogedIn: true };
    }
    default: {
      throw new Error("Unhandled action type: " + action.type);
    }
  }
};

const initialState = { isLogedIn: false };

const AuthStateContext = createContext<State | undefined>(undefined);
const AuthDispatchContext = createContext<Dispatch | undefined>(undefined);

const AuthProvider = (children: React.ReactNode) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

export default [AuthProvider, useAuthState, useAuthDispatch];
