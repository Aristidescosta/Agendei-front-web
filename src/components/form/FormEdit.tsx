import "./formStyle.scss";

/* Hook Form e Hooks */
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { List } from "react-content-loader";

/* Material UI */
import {
  Input,
  IconButton,
  Avatar,
  Button,
  makeStyles,
  Theme,
  createStyles,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@material-ui/core";
import {
  AddAPhotoOutlined,
  HouseRounded,
  Send,
  PhotoCamera,
} from "@material-ui/icons";
/* Yup */
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState, ChangeEvent } from "react";

import { AuthContext } from "../../contexts/auth/AuthContext";
import { InputError } from "../InputErrors";
import "./formStyle.scss";
import { dev } from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";

/* Types */
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

/* Yup register */
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

interface imageType {
  id: number;
  img: string;
}

interface imageTypeFile {
  id: number;
  img: File;
}

interface openType {
  dia: number;
  open: string;
  close: string;
}

type establishmentType = {
  _id: string;
  categoryId: string;
  name: string;
  nif: number;
  img: string;
  address: string;
  open: boolean;
};
export const FormEdit = () => {
  const auth = useContext(AuthContext);
  const { estId } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [establishment, setEstablishment] = useState<object | void>();

  const [itemData, setItemData] = useState<Array<imageType>>([]);

  const [picture2, setPicture2] = useState<File>();
  const [picture3, setPicture3] = useState<Array<imageTypeFile>>([]);
  const [data, setData] = useState<[]>([]);
  const validOpen_to: Array<openType> = [];

  useEffect(() => {
    const getCategory = async () => {
      const response = await auth.getCategory();
      setData(response);
    };
    const getEstablishment = async () => {
      if (estId) {
        const response = await auth.getOneEstablishment(estId);
        setEstablishment(response);
      }
    };
    getEstablishment();
    getCategory();
  }, []);
  console.log(auth.establishment)
  const [picture, setPicture] = useState(`${dev.API_URL}/${auth.establishment?.img}`);

  const open_to = [
    {
      dia: 0,
      open: "",
      close: "",
      checked: false,
    },
    {
      dia: 1,
      open: "",
      close: "",
      checked: false,
    },
    {
      dia: 2,
      open: "",
      close: "",
      checked: false,
    },
    {
      dia: 3,
      open: "",
      close: "",
      checked: false,
    },
    {
      dia: 4,
      open: "",
      close: "",
      checked: false,
    },
    {
      dia: 5,
      open: "",
      close: "",
      checked: false,
    },
    {
      dia: 6,
      open: "",
      close: "",
      checked: false,
    },
  ];

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    let id = Number(event.currentTarget.getAttribute("id"));
    if (event.currentTarget.value !== "")
      open_to[id].open = event.currentTarget.value;
  }

  function handleChangeClose(event: ChangeEvent<HTMLInputElement>) {
    let id = Number(event.currentTarget.getAttribute("id"));
    if (event.currentTarget.value !== "")
      open_to[id].close = event.currentTarget.value;
  }

  function handleTime() {
    for (let i = 0; i < 7; i++) {
      if (
        (open_to[i].close === "" && open_to[i].open !== "") ||
        (open_to[i].close !== "" && open_to[i].open === "")
      ) {
        toast.error("Dados do horário, mau definidos");
      } else if (
        open_to[i].checked &&
        open_to[i].close !== "" &&
        open_to[i].open !== ""
      ) {
        validOpen_to.push(open_to[i]);
      }
    }
  }

  function handleChecked(event: ChangeEvent<HTMLInputElement>) {
    let id = Number(event.currentTarget.getAttribute("id"));

    if (event.currentTarget.checked) {
      open_to[id].checked = event.currentTarget.checked;
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(myYupResolver) });

  const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setPicture2(event.currentTarget.files[0]);
      let url = URL.createObjectURL(event.currentTarget.files[0]);
      setPicture(url);
    }
  };

  const list = data.map((category: I) => (
    <option key={category._id} value={category?._id}>
      {category?.name}
    </option>
  ));

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
      },
      imageList: {
        flexWrap: "nowrap",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: "translateZ(0)",
      },
      title: {
        color: theme.palette.primary.light,
      },
      titleBar: {
        background:
          "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
      },
      input: {
        display: "none",
      },
    })
  );

  function addNewPhoto(event: ChangeEvent<HTMLInputElement>) {
    console.log("Teste")
    if (event.currentTarget.files && establishment) {
      let url = URL.createObjectURL(event.currentTarget.files[0]);
      const newItemData = {
        id: itemData.length,
        img: url,
      };
      console.log(newItemData);

      const newItemDataFile = {
        id: itemData.length,
        img: event.currentTarget.files[0],
      };

      setItemData([...itemData, newItemData]);
      setPicture3([...picture3, newItemDataFile]);
    }
  }

  function deletePhoto(id: number) {
    const remainingPhoto = itemData.filter((item: imageType) => id !== item.id);
    setItemData(remainingPhoto);

    const remainingPhotoFile = picture3.filter((item: imageTypeFile) => id !== item.id);
    setPicture3(remainingPhotoFile);
  }

  const classes = useStyles();

  function handle(event: ChangeEvent<HTMLSelectElement>) {
    setCategoryName(event.target.selectedOptions[0].text);
    setCategoryId(event.target.value);
  }


  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    let idToast = toast.loading("Carregando...!");
    handleTime();
    let formData = new FormData();
    let formData1 = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("number1", data.number1.toString());
    formData.append("number2", data.number2.toString());
    formData.append("nif", data.nif.toString());
    formData.append("categoryid", categoryId);
    formData.append("categoryname", categoryName);
    formData.append("description", data.description);
    formData.append("open_to", JSON.stringify(validOpen_to));
    formData.append("imagesCount", JSON.stringify(picture3.length));

    if (picture3.length > 0) {
      for (var i = 0; i < picture3.length; i++) {
        formData.append("files", picture3[i].img);
      }
    }

    if (picture2) formData1.append("file", picture2);
  
    try {
      const request = await fetch(`${dev.API_URL}/est/update/${estId}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          undefined: "multipart/form-data",
        },
      });
      await request.json();
    } catch (error: any) {
      toast.error(error.message);
    }

    try {
      const request = await fetch(`${dev.API_URL}/est/uploadimage/${estId}`, {
        method: "POST",
        body: formData1,
        headers: {
          Accept: "application/json",
          undefined: "multipart/form-data",
        },
      });
      await request.json().then((response) => {
        toast.update(idToast, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      });
    } catch (error: any) {
      toast.update(idToast, {
        render: error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } 
    // navigate("/");
  };

  return (
    <>
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
      />
      {/* Same as */}
      <ToastContainer />
      {!auth.establishment ? (
        <List />
      ) : (
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

          <form className="editEstablishment" onSubmit={handleSubmit(onSubmit)}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">
                {auth.establishment.name}
              </li>
              <li className="breadcrumb-item active">Editar</li>
            </ol>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      {...register("name")}
                      defaultValue={auth.establishment.name}
                      placeholder="Nome"
                      type="text"
                    />
                    {errors.name?.message && (
                      <InputError type={errors.name.type} field="name" />
                    )}
                  </div>

                  <div className="col-md-6">
                    <Input
                      {...register("nif")}
                      placeholder="Número de nif"
                      defaultValue={auth.establishment.nif}
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
                      defaultValue={auth.establishment.phones_number[0]}
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
                      defaultValue={auth.establishment.phones_number[1]}
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
                      defaultValue={auth.establishment.address}
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
                        defaultValue={auth.establishment.category._id}
                      >
                        {list}
                        <option value={auth.establishment.category._id}>
                          {auth.establishment.category.name}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="describe col-md-12">
                    <label>Faça uma descrição</label>
                    <textarea
                      {...register("description")}
                      defaultValue={auth.establishment.description}
                    ></textarea>
                    {errors.description?.message && (
                      <InputError
                        type={errors.description.type}
                        field="description"
                      />
                    )}
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <div className={classes.root}>
                          {itemData.length === 0 ? (
                            <h1>Sem imagens</h1>
                          ) : (
                            <ImageList className={classes.imageList} cols={2.5}>
                              {itemData.map((item: imageType) => (
                                <ImageListItem key={item.id}>
                                  <img
                                    src={
                                      item.img.includes("uploads")
                                        ? `${dev.API_URL}/${item?.img}`
                                        : item.img
                                    }
                                    alt={"item.title"}
                                  />
                                  <ImageListItemBar
                                    title={
                                      <Button
                                        onClick={() => deletePhoto(item?.id)}
                                      >
                                        Eliminar
                                      </Button>
                                    }
                                    classes={{
                                      root: classes.titleBar,
                                    }}
                                  />
                                </ImageListItem>
                              ))}
                            </ImageList>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="icon-button-file1">
                          <input
                            accept="image/*"
                            id="icon-button-file1"
                            type="file"
                            className={classes.input}
                            onChange={addNewPhoto}
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
                </div>
              </div>

              <div className="col-md-6">
                <div className="row">
                  {/* <FormListTransfer /> */}
                  <table>
                    <thead>
                      <tr>
                        <th>Dia</th>
                        <th>Aberto as</th>
                        <th>Até as</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div>
                            <input
                              id="0"
                              type="checkbox"
                              onChange={handleChecked}
                            />
                            <span>Segunda-Feira</span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChange}
                            className="timers"
                            id="0"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChangeClose}
                            className="timers"
                            id="0"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div>
                            <input
                              id="1"
                              type="checkbox"
                              onChange={handleChecked}
                            />
                            <span>Terça-Feira</span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChange}
                            className="timers"
                            id="1"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChangeClose}
                            className="timers"
                            id="1"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div>
                            <input
                              id="2"
                              type="checkbox"
                              onChange={handleChecked}
                            />
                            <span>Quarta-Feira</span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChange}
                            className="timers"
                            id="2"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChangeClose}
                            className="timers"
                            id="2"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div>
                            <input
                              id="3"
                              type="checkbox"
                              onChange={handleChecked}
                            />
                            <span>Quinta-Feira</span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChange}
                            className="timers"
                            id="3"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChangeClose}
                            className="timers"
                            id="3"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div>
                            <input
                              id="4"
                              type="checkbox"
                              onChange={handleChecked}
                            />
                            <span>Sexta-Feira</span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChange}
                            className="timers"
                            id="4"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChangeClose}
                            className="timers"
                            id="4"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div>
                            <input
                              id="5"
                              type="checkbox"
                              onChange={handleChecked}
                            />
                            <span>Sábado</span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChange}
                            className="timers"
                            id="5"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChangeClose}
                            className="timers"
                            id="5"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div>
                            <input
                              id="6"
                              type="checkbox"
                              onChange={handleChecked}
                            />
                            <span>Domingo</span>
                          </div>
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChange}
                            className="timers"
                            id="6"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            onChange={handleChangeClose}
                            className="timers"
                            id="6"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Button
                    variant="contained"
                    className="btn"
                    type="submit"
                    endIcon={<Send />}
                  >
                    Enviar
                  </Button>
                </div>
              </div>
            </div>

            {/* <Button
                      variant="contained"
                      className="btn"
                      type="submit"
                      endIcon={<Send />}
                    >
                      Enviar
                    </Button>*/}
          </form>
        </>
      )}
    </>
  );
};
