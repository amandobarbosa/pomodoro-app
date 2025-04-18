import { JSX, useCallback, useEffect, useState } from "react";
import { useInterval } from "../hooks/use-setInterval";
import { SecondsToTime } from "../utils/seconds-to-time";
import { Button } from "./button";
import { Timer } from "./timer";

const bellStart = require("../sounds/bell-start.mp3");
const bellFinish = require("../sounds/bell-finish.mp3");

const audioStartWorking = new Audio(bellStart);
const audioFinishWorking = new Audio(bellFinish);

export function PomodoroTimer() {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [shortRestTime, setShortRestTime] = useState(5 * 60);
  const [longRestTime, setLongRestTime] = useState(15 * 60);
  const [cycles, setCycles] = useState(4);

  const [mainTime, setMainTime] = useState(pomodoroTime);
  const [timeCounting, setTimeCount] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdMenager, setCyclesQtdMenager] = useState(
    new Array(cycles - 1).fill(true)
  );
  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [NumberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime((prev) => prev - 1);
      if (working) setFullWorkingTime((prev) => prev + 1);
    },
    timeCounting ? 1000 : null
  );

  const configureWork = useCallback(() => {
    setTimeCount(true);
    setWorking(true);
    setResting(false);
    setMainTime(pomodoroTime);
    audioStartWorking.play();
  }, [pomodoroTime]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCount(true); 
      setWorking(false);
      setResting(true);
      setMainTime(long ? longRestTime : shortRestTime);
      audioFinishWorking.play();
    },
    [shortRestTime, longRestTime]
  );

  useEffect(() => {
    if (working) {
      document.body.classList.add("working");
    }
    if (resting) {
      document.body.classList.remove("working");
    }

    if (mainTime > 0) return;

    if (working && cyclesQtdMenager.length > 0) {
      configureRest(false);
      setCyclesQtdMenager((prev) => {
        const updated = [...prev];
        updated.pop();
        return updated;
      });
      setNumberOfPomodoros((prev) => prev + 1);
      return;
    }

    if (working && cyclesQtdMenager.length === 0) {
      configureRest(true);
      setCyclesQtdMenager(new Array(cycles - 1).fill(true));
      setCompletedCycles((prev) => prev + 1);
      setNumberOfPomodoros((prev) => prev + 1);
      return;
    }

    if (resting) {
      configureWork();
      return;
    }
  }, [working, resting, mainTime, cyclesQtdMenager, cycles, configureRest, configureWork]);

  const [configInputs, setConfigInputs] = useState({
    pomodoroTime: pomodoroTime / 60,
    shortRestTime: shortRestTime / 60,
    LongRestTime: longRestTime / 60,
    Cycles: cycles,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfigInputs((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const applySettings = () => {
    setPomodoroTime(configInputs.pomodoroTime * 60);
    setShortRestTime(configInputs.shortRestTime * 60);
    setLongRestTime(configInputs.LongRestTime * 60);
    setCycles(configInputs.Cycles);
    setMainTime(configInputs.pomodoroTime * 60);
    setCyclesQtdMenager(new Array(configInputs.Cycles - 1).fill(true));
    setCompletedCycles(0);
    setFullWorkingTime(0);
    setNumberOfPomodoros(0);
  };

  return (
    <>
      <div className="pomodoro">
        <h2>Você está {working ? "trabalhando" : "descansando"}</h2>
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
          <p>Ciclos concluídos {completedCycles}</p>
          <p>Tempo trabalhado {SecondsToTime(fullWorkingTime)}</p>
          <p>Pomodoros concluídos {NumberOfPomodoros}</p>
        </div>
      </div>

      <div className="config-panel">
        <h3>Configurações</h3>
        <label>
          Pomodoro (minutos):
          <input
            type="number"
            name="pomodoroTime"
            value={configInputs.pomodoroTime}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Descanso Curto (minutos):
          <input
            type="number"
            name="shortRestTime"
            value={configInputs.shortRestTime}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Descanso Longo (minutos):
          <input
            type="number"
            name="LongRestTime"
            value={configInputs.LongRestTime}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Ciclos antes do descanso longo:
          <input
            type="number"
            name="Cycles"
            value={configInputs.Cycles}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button onClick={applySettings}>Aplicar Configurações</button>
      </div>
    </>
  );
}
