import "./confirmCode.scss";
import { useForm } from "react-hook-form";
import { Input } from "@material-ui/core";
import { Button } from "../../components/Button";
import { Label } from "@material-ui/icons";

export const Index = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    alert(JSON.stringify(data));
  }

  return (
    <div className="container-code">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Verifique o seu email</p>
        <br />
        <div className="confirm-text">
          <Label />
          <h4 htmlFor="confirmCode">Digite o código de confirmação</h4>
        </div>
       
        <Input name="confirmCode" type="number" {...register("confirmCode", { required: true, minLength: 4, maxLength: 4 })} />
        {errors.confirmCode && <span>Apenas 4 caracteres</span>}

        <Button type="submit" className="button">Enviar código</Button>
      </form>
    </div>
  )
}
