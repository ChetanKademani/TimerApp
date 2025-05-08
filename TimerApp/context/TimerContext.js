import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TimerContext = createContext();

const initialState = {
  timers: [],
  history: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TIMER":
      return { ...state, timers: [...state.timers, action.payload] };
    case "UPDATE_TIMER":
      return {
        ...state,
        timers: state.timers.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };
    case "RESET_TIMERS":
      return { ...state, timers: action.payload };
    case "ADD_TO_HISTORY":
      return { ...state, history: [...state.history, action.payload] };
    case "LOAD_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from AsyncStorage on app load
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("TIMER_STATE");
      if (stored) dispatch({ type: "LOAD_STATE", payload: JSON.parse(stored) });
    })();
  }, []);

  // Save to AsyncStorage on change
  useEffect(() => {
    AsyncStorage.setItem("TIMER_STATE", JSON.stringify(state));
  }, [state]);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

export { TimerContext, TimerProvider };
