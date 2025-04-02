import { JSX } from "react";
interface Props {
  text: string;
  onCLick?: () => void;
  className?: string;
}

export function Button(props: Props): JSX.Element {
  return (
    <button className={props.className} onClick={props.onCLick}>
      {props.text}
    </button>
  );
}
