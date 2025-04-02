import { JSX, useState } from "react";
import { useInterval } from "../hooks/use-setInterval";
import { SecondsToTime } from "../utils/seconds-to-time";
import { Button } from "./button";
import { Timer } from "./timer";
interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  LongRestTime: number;
  Cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);
  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button onCLick={() => console.log(1)} text="test" />
        <Button onCLick={() => console.log(1)} text="test" />
        <Button onCLick={() => console.log(1)} text="test" />
      </div>
      <div className="details">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, aliquam
          omnis quidem dicta nulla in quis? Exercitationem totam laudantium,
          blanditiis, quia ab, voluptates quos facilis recusandae est libero
          tempora illum.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, aliquam
          omnis quidem dicta nulla in quis? Exercitationem totam laudantium,
          blanditiis, quia ab, voluptates quos facilis recusandae est libero
          tempora illum.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, aliquam
          omnis quidem dicta nulla in quis? Exercitationem totam laudantium,
          blanditiis, quia ab, voluptates quos facilis recusandae est libero
          tempora illum.
        </p>
      </div>
    </div>
  );
}
