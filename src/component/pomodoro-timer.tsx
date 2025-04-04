import { JSX, useEffect, useState } from "react";
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
  const [timeCounting, setTimeCount] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null
  );

  const configureWork = () => {
    setTimeCount(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
  };
  const configureRest = (long: boolean) => {
    setTimeCount(false);
    setWorking(false);
    setResting(true);

    if (long) {
      setMainTime(props.LongRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
  };
  useEffect(() => {
    if (working) {
      document.body.setAttribute("class", "working");
    }
    if (resting) {
      document.body.classList.remove("working");
    }
  }, [working]);

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button onCLick={configureWork} text="Work" />
        <Button onCLick={() => configureRest(false)} text="Rest" />
        <Button
          className={!working && !resting ? "hidden" : ""}
          onCLick={() => setTimeCount(!timeCounting)}
          text={timeCounting ? "Pause" : "Play"}
        />
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
