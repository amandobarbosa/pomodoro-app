import { JSX } from "react";
import { PomodoroTimer } from "./component/pomodoro-timer";
function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer
        shortRestTime={300}
        LongRestTime={300}
        pomodoroTime={1500}
        Cycles={4}
      />
    </div>
  );
}
export default App;
