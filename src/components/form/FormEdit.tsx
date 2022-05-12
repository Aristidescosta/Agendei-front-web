//Importações dos hooks
import { useEffect, useState, useContext, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
//Importações do Material UI
import "./formStyle.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "../InputErrors";
import "react-toastify/dist/ReactToastify.min.css";
import { AuthContext } from "../../contexts/auth/AuthContext";
import {
  Input,
  IconButton,
  Avatar,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { AddAPhotoOutlined, HouseRounded, Send } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

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


export const FormEdit = () => {
  const [data, setData] = useState<[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [picture, setPicture] = useState("http://10.254.124.62:3005/" + auth.establishment?.img);
  const [picture2, setPicture2] = useState<File>();
  console.log(picture2)
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(myYupResolver) });

  function handle(event: ChangeEvent<HTMLSelectElement>) {
    setCategoryName(event.target.selectedOptions[0].text);
    setCategoryId(event.target.value);
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data, categoryId, categoryName);
    let formData = new FormData();
    toast.loading("Carregando...!");
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("number1", data.number1.toString());
    formData.append("number2", data.number2.toString());
    formData.append("nif", data.nif.toString());
    formData.append("categoryid", categoryId);
    formData.append("categoryname", categoryName);
    if (auth.user) formData.append("userid", auth.user._id);
    formData.append("description", data.description);
    if (picture2) formData.append("file", picture2);

    /* const response = await auth.setEstablishment(formData)
    console.log(response) */
    try {
      const request = await fetch("http://10.254.124.62:3005/est/post", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          undefined: "multipart/form-data",
        },
      });
      const response = await request.json();
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
    navigate("/");
    toast.success("Estabelecimento criado com sucesso!");
    /* const response = await auth.setEstablishment(formData);
    console.log(response); */
  };

  return (
    <form className="formNewsEstablishment" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-9 col-md-9">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xm-12">
              <Input {...register("name")} defaultValue={auth.establishment?.name} placeholder="Nome" type="text" />
              {errors.name?.message && ( 
                <div>
                  <InputError type={errors.name.type} field="name" />
                </div>
              )}
            </div>

            <div className="col-md-6 col-sm-6 col-xm-12">
              <Input
                {...register("nif")}
                placeholder="Número de nif"
                type="number"
                defaultValue={auth.establishment?.nif}
              />
              {errors.nif?.message && (
                <div>
                  <InputError type={errors.nif.type} field="nif" />
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-6 col-xm-12">
              <Input
                {...register("number1")}
                placeholder="Number1"
                type="number"
                defaultValue={auth.establishment?.phones_number[0]}
              />
              {errors.number1?.message && (
                <div>
                  <InputError type={errors.number1.type} field="number1" />
                </div>
              )}
            </div>

            <div className="col-md-6 col-sm-6 col-xm-12">
              <Input
                {...register("number2")}
                placeholder="Number2"
                type="number2"
                defaultValue={auth.establishment?.phones_number[1]}
              />
              {errors.number2?.message && (
                <div><InputError type={errors.number2.type} field="number2" /></div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-6 col-xm-12">
              <Input
                {...register("address")}
                placeholder="Localização"
                type="text"
                defaultValue={auth.establishment?.address}
              />
              {errors.address?.message && (
                <div><InputError type={errors.address.type} field="address" /></div>
              )}
            </div>
            <div className="col-md-6 col-sm-6 col-xm-12">
              <div className="MuiInputBase-root MuiInput-root MuiInput-underline">
                <select id="id"  className="MuiInputBase-input MuiInput-input" onChange={handle}>
                  {list}
                </select>
              </div>
            </div>
          </div>
          <div className="describe .col-sm-12">
            <label>Faça uma descrição</label>
            <textarea defaultValue={auth.establishment?.description} {...register("description")}></textarea>
            {errors.description?.message && (
              <div><InputError type={errors.description.type} field="description" /></div>
            )}
          </div>
        </div>

        <div className="col-lg-3 col-md-3">
          <div className="add-est">
            <Avatar src={picture}>
              <HouseRounded />
            </Avatar>

            <label htmlFor="icon-button-file" className="s">
              <input
                accept="image/*"
                id="icon-button-file"
                src={auth.establishment?.img}
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
  );
}
