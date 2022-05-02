import "./confirmCode.scss";
import { useForm } from "react-hook-form";
import { Input } from "@material-ui/core";
import { Button } from "../../components/Button";
import { Label } from "@material-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { Toaster } from "react-hot-toast"

export const Index = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const auth = useContext(AuthContext);
  
  const onSubmit = async data => {
    const response = await auth.confirmCode(auth.email, data.confirmationCode);
    console.log(response) 
  }

  return (
    <div className="container-code">
      <div><Toaster></Toaster></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Verifique o seu email</p>
        <br />
        <div className="confirm-text">
          <Label />
          <h4 htmlFor="confirmationCode">Digite o código de confirmação</h4>
        </div>
       
        <Input name="confirmationCode" type="number" {...register("confirmationCode", { required: true, minLength: 4, maxLength: 4 })} />
        {errors.confirmationCode && <span>Apenas 4 caracteres</span>}

        <Button type="submit" className="button">Enviar código</Button>
      </form>
    </div>
  )
}
