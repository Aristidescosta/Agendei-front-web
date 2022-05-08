import "./style.scss";
import errors from "../../utils/errors.json";

interface InputErrorProps{
  type: string,
  field: string
}

export const InputError = ({ type, field }: InputErrorProps) => {
  //@ts-expect-error
  return <span className="field-error">{ errors[field][type] }</span>;
};
