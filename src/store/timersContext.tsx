import React from "react";

export type Timer = {
  name: string;
  duration: number;
};
type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersAction = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimer: () => void;
  stopTimer: () => void;
};

const initialState: TimersState = {
  isRunning: true,
  timers: [],
};

const TimersContext = React.createContext<TimersAction | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useTimersContext = () => {
  const timersCtx = React.useContext(TimersContext);
  if (timersCtx === null) {
    throw new Error("TimersContext is null");
  }
  return timersCtx;
};

type Props = {
  children: React.ReactNode;
};

type StartTimersAction = {
  type: "START_TIMER";
};
type StopTimersAction = {
  type: "STOP_TIMER";
};
type AddTimerAction = {
  type: "ADD_TIMER";
  payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

const timersReducer = (state: TimersState, action: Action): TimersState => {
  switch (action.type) {
    case "ADD_TIMER":
      return {
        ...state,
        timers: [
          ...state.timers,
          {
            name: action.payload.name,
            duration: action.payload.duration,
          },
        ],
      };
    case "START_TIMER":
      return {
        ...state,
        isRunning: true,
      };
    case "STOP_TIMER":
      return {
        ...state,
        isRunning: false,
      };
    default:
      return state;
  }
};

const TimersContextProvider = ({ children }: Props) => {
  const [timersState, dispatch] = React.useReducer(timersReducer, initialState);

  const ctx: TimersAction = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer: (timerData) => {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimer: () => {
      dispatch({ type: "START_TIMER" });
    },
    stopTimer: () => {
      dispatch({ type: "STOP_TIMER" });
    },
  };

  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
};

export default TimersContextProvider;
