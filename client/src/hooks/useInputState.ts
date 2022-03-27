import { ChangeEvent, useState } from "react";

export const useInputState = <T extends object>(initialValue: T) => {
  const [controls, setControls] = useState<T>(initialValue);

  const doChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setControls({ ...controls, [e.target.name]: e.target.value });
  };

  return { doChangeHandler, controls };
};
