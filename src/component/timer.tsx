import { JSX } from "react";
import { SecondsToTime } from "../utils/seconds-to-time";
interface Props {
  mainTime: number;
}
export function Timer(props: Props): JSX.Element {
  return <div className="timer">{SecondsToTime(props.mainTime)}</div>;
}
