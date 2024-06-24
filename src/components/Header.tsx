import { useTimersContext } from "../store/timersContext";
import Button from "./UI/Button";

const Header = () => {
  const timersCtx = useTimersContext();

  return (
    <header>
      <h1>ReactTimer</h1>
      <Button
        onClick={
          timersCtx.isRunning ? timersCtx.stopTimer : timersCtx.startTimer
        }
      >
        {timersCtx.isRunning ? "stop" : "start"} timers
      </Button>
    </header>
  );
};

export default Header;
