import { JSX } from "react";
import { PomodoroTimer } from "./component/pomodoro-timer";
function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroTimer />
    </div>
  );
}
export default App;
