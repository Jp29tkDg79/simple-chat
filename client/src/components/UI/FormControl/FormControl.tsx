import { InputHTMLAttributes } from "react";

import classes from "./FormControl.module.css";

type FormControlProps = {
  id: string;
  inputElement: InputHTMLAttributes<HTMLInputElement>;
  text: string;
};

const FormControl = ({ id, inputElement, text }: FormControlProps) => {
  return (
    <div className={classes.control}>
      <label htmlFor={id}>{text}</label>
      <input id={id} {...inputElement} />
    </div>
  );
};

export default FormControl;
