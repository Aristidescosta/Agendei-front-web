import { dev } from "../../config/config";
import { useEffect, useState, useContext, ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "../InputErrors";
import { AuthContext } from "../../contexts/auth/AuthContext";
import "react-toastify/dist/ReactToastify.min.css";
import { Input, IconButton, Avatar, Button } from "@material-ui/core";
import { AddAPhotoOutlined, HouseRounded, Send } from "@material-ui/icons";
import { useNavigate, Link } from "react-router-dom";

interface I {
  _id: string;
  name: string;
}
interface IFormInput {
  name: string;
  nif: string;
  description: string;
  address: string;
  number1: number;
  number2: number;
  categoryId: string;
}

const myYupResolver = yup
  .object({
    name: yup.string().required(),
    nif: yup.string().required(),
    description: yup.string().required(),
    address: yup.string().required(),
    number1: yup.string().required(),
    number2: yup.string().required(),
  })
  .required();

export const FormNewsEstablishment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(myYupResolver) });

  const [data, setData] = useState<[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [picture, setPicture] = useState("");
  const [picture2, setPicture2] = useState<File>();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setPicture2(event.currentTarget.files[0]);
      let url = URL.createObjectURL(event.currentTarget.files[0]);
      setPicture(url);
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      const response = await auth.getCategory();
      setData(response);
    };
    getCategory();
  }, []);

  const list = data.map((category: I) => (
    <option key={category._id} value={category?._id}>
      {category?.name}
    </option>
  ));

  function handle(event: ChangeEvent<HTMLSelectElement>) {
    setCategoryName(event.target.selectedOptions[0].text);
    setCategoryId(event.target.value);
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    let formData = new FormData();

    
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("number1", data.number1.toString());
    formData.append("number2", data.number2.toString());
    formData.append("nif", data.nif.toString());
    formData.append("categoryid", categoryId);
    formData.append("categoryname", categoryName);
    if (auth.user) formData.append("userid", auth.user._id);
    if (auth.user) formData.append("username", auth.user.username);
    formData.append("description", data.description);
    if (picture2) formData.append("file", picture2);

    let idToast = toast.loading("Carregando...!");
    try {
      const request = await fetch(`${dev.API_URL}/est/post`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          undefined: "multipart/form-data",
        },
      });
      await request
        .json()
        .then((response) =>
          toast.update(idToast, {
            render: response.message,
            type: "success",
            isLoading: false,
            autoClose: 5000,
          })
        )
        .catch((error) =>
          toast.update(idToast, {
            render: error.message,
            type: "error",
            isLoading: false,
            autoClose: 5000,
          })
        );
    } catch (error: any) {
      toast.update(idToast, {
        render: error.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
      })
    }
    /* toast.success("Estabelecimento criado com sucesso!");
    navigate("/"); */
  };

  return (
    <>
      <div className="separator">
        <div className="add-est">
          <Avatar src={picture}>
            <HouseRounded />
          </Avatar>

          <label htmlFor="icon-button-file" className="s">
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={handleSetImage}
            />
            <IconButton
              color="primary"
              aria-label="Atualizar a fotografia"
              component="span"
            >
              <AddAPhotoOutlined />
            </IconButton>
          </label>
        </div>
      </div>

      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={2}
        />
        {/* Same as */}
        <ToastContainer />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Novo</li>
        </ol>
        <div className="row">
          <div className="col-md-6">
            <Input {...register("name")} placeholder="Nome" type="text" />
            {errors.name?.message && (
              <InputError type={errors.name.type} field="name" />
            )}
          </div>

          <div className="col-md-6">
            <Input
              {...register("nif")}
              placeholder="Número de nif"
              type="number"
            />
            {errors.nif?.message && (
              <InputError type={errors.nif.type} field="nif" />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input
              {...register("number1")}
              placeholder="Primeiro número"
              type="number"
            />
            {errors.number1?.message && (
              <InputError type={errors.number1.type} field="number1" />
            )}
          </div>

          <div className="col-md-6">
            <Input
              {...register("number2")}
              placeholder="Segundo número"
              type="number"
            />
            {errors.number2?.message && (
              <InputError type={errors.number2.type} field="number2" />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input
              {...register("address")}
              placeholder="Localização"
              type="text"
            />
            {errors.address?.message && (
              <InputError type={errors.address.type} field="address" />
            )}
          </div>

          <div className="col-md-6">
            <div className="MuiInputBase-root MuiInput-root MuiInput-underline">
              <select
                id="id"
                className="MuiInputBase-input MuiInput-input"
                onChange={handle}
              >
                {list}
                <option value="others">Outros</option>
              </select>
            </div>
          </div>

          <div className="describe .col-sm-12 .col-md-12">
            <label>Faça uma descrição</label>
            <textarea {...register("description")}></textarea>
            {errors.description?.message && (
              <InputError type={errors.description.type} field="description" />
            )}
          </div>
        </div>
        <Button
          variant="contained"
          className="btn"
          type="submit"
          endIcon={<Send />}
        >
          Enviar
        </Button>
      </form>
    </>
  );
};
