import "./formStyle.scss";

/* Hook Form e Hooks */
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

/* Material UI */
import {
  Input,
  IconButton,
  Avatar,
  Button,
  Radio,
  makeStyles,
  Theme,
  createStyles,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { AddAPhotoOutlined, HouseRounded, Send } from "@material-ui/icons";
/* Yup */
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState, ChangeEvent } from "react";

import { AuthContext } from "../../contexts/auth/AuthContext";
import { InputError } from "../InputErrors";
import "./formStyle.scss"; 
import img from "../assets/img/agendei/bg.jpg";
import img1 from "../assets/img/agendei/bg1.jpg";
import img2 from "../assets/img/agendei/bg2.jpg";
import img3 from "../assets/img/agendei/bg3.jpg";
import img4 from "../assets/img/agendei/bg4.jpg";
import img5 from "../assets/img/agendei/bg5.jpg";
 

function createClientData(
  day: string,
  open: string,
  t: string,
  op: JSX.Element
) {
  return { day, open, t, op };
}

const rows = [
  createClientData("Segunda", "10:24", "22:30", <Button>Cancelar</Button>),
  createClientData("Quinta", "08:00", "00:00", <Button>Cancelar</Button>),
  createClientData("Quinta", "08:00", "00:00", <Button>Cancelar</Button>),
  createClientData("Quinta", "08:00", "00:00", <Button>Cancelar</Button>),
  createClientData("Quinta", "08:00", "00:00", <Button>Cancelar</Button>)

]

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

export const FormEdit = () => {
  const auth = useContext(AuthContext);
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [picture, setPicture] = useState(
    "http://192.168.1.5:3005/" + auth.establishment?.img
  );
  const [picture2, setPicture2] = useState<File>();
  const [data, setData] = useState<[]>([]);
  const [show, setShow] = useState(true);
  const [selectedValue, setSelectedValue] = useState("segunda");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const setDay = (
    <>
      <div className="col-md-3">
        <span>Segunda</span>
        <Radio
          color="primary"
          checked={selectedValue === "segunda"}
          onChange={handleChange}
          value="segunda"
          name="radio-button-demo"
          inputProps={{ "aria-label": "Segunda" }}
        />
      </div>

      <div className="col-md-3">
        <span>Terça</span>
        <Radio
          color="primary"
          checked={selectedValue === "terça"}
          onChange={handleChange}
          value="terça"
          name="radio-button-demo"
          inputProps={{ "aria-label": "Terça" }}
        />
      </div>

      <div className="col-md-3">
        <span>Quarta</span>
        <Radio
          color="primary"
          checked={selectedValue === "quarta"}
          onChange={handleChange}
          value="quarta"
          name="radio-button-demo"
          inputProps={{ "aria-label": "Quarta" }}
        />
      </div>

      <div className="col-md-3">
        <span>Quinta</span>
        <Radio
          color="primary"
          checked={selectedValue === "quinta"}
          onChange={handleChange}
          value="quinta"
          name="radio-button-demo"
          inputProps={{ "aria-label": "Quinta" }}
        />
      </div>

      <div className="col-md-3">
        <span>Sexta</span>
        <Radio
          color="primary"
          checked={selectedValue === "sexta"}
          onChange={handleChange}
          value="sexta"
          name="radio-button-demo"
          inputProps={{ "aria-label": "Sexta" }}
        />
      </div>

      <div className="col-md-3">
        <span>Sábado</span>
        <Radio
          color="primary"
          checked={selectedValue === "sabado"}
          onChange={handleChange}
          value="sabado"
          name="radio-button-demo"
          inputProps={{ "aria-label": "Sábado" }}
        />
      </div>

      <div className="col-md-3">
        <span>Domingo</span>
        <Radio
          color="primary"
          checked={selectedValue === "domingo"}
          onChange={handleChange}
          value="domingo"
          name="radio-button-demo"
          inputProps={{ "aria-label": "Domingo" }}
        />
      </div>
    </>
  );

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

  const setTime = (
    <>
      <div className="col-md-6">
        <p>Aberto as</p>
        <Input type="time" />
      </div>
      <div className="col-md-6">
        <p>Até as </p>
        <Input type="time" />
      </div>
    </>
  );

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
    })
  );
  const itemData = [
    {
      img: img,
      title: "Imagem do estabelecimento",
      author: "author",
    },

    {
      img: img1,
      title: "Imagem do estabelecimento",
      author: "author",
    },

    {
      img: img2,
      title: "Imagem do estabelecimento",
      author: "author",
    },

    {
      img: img3,
      title: "Imagem do estabelecimento",
      author: "author",
    },

    {
      img: img4,
      title: "Imagem do estabelecimento",
      author: "author",
    },

    {
      img: img5,
      title: "Imagem do estabelecimento",
      author: "author",
    },
  ];

  const classes = useStyles();

  function handle(event: ChangeEvent<HTMLSelectElement>) {
    setCategoryName(event.target.selectedOptions[0].text);
    setCategoryId(event.target.value);
  }

  useEffect(() => {
    const getEstablishment = async () => {
      if (typeof id !== "undefined") await auth.getOneEstablishment(id);
    };
    getEstablishment();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      const response = await auth.getCategory();
      setData(response);
    };
    getCategory();
  }, []);

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

      <form className="editEstablishment">
        <div className="row">
          <div className="col-lg-9">
            <div className="row">
              <div className="col-md-6">
                <Input
                  {...register("name")}
                  defaultValue={auth.establishment?.name}
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
                  defaultValue={auth.establishment?.nif}
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
                  defaultValue={auth.establishment?.phones_number[0]}
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
                  defaultValue={auth.establishment?.phones_number[1]}
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
                  defaultValue={auth.establishment?.address}
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
            </div>

            <div className="row">
              <div className="describe col-md-6">
                <label>Faça uma descrição</label>
                <textarea
                  {...register("description")}
                  defaultValue={auth.establishment?.description}
                ></textarea>
                {errors.description?.message && (
                  <InputError
                    type={errors.description.type}
                    field="description"
                  />
                )}
              </div>

              <div className="col-md-6">
                <div className="row">
                  {show ? setTime : setDay}
                  {/* <div className="col-md-6">
                    <div className="row"></div>
                  </div>

                  <div className="col-md-6">
                    <Button
                      variant="contained"
                      className="btn"
                      type="submit"
                      endIcon={<Send />}
                    >
                      Adicionar
                    </Button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className={classes.root}>
                  <ImageList className={classes.imageList} cols={2.5}>
                    {itemData.map((item) => (
                      <ImageListItem key={item.img}>
                        <img src={item.img} alt={item.title} />
                        <ImageListItemBar
                          title={item.title}
                          classes={{
                            root: classes.titleBar,
                            title: classes.title,
                          }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
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

          <div className="col-lg-3">
          <TableContainer component={Paper}>
        <Table aria-label="Tabela customizada">
          <TableHead>
            <TableRow>
              <TableCell>Dia</TableCell>
              <TableCell>Aberto as</TableCell>
              <TableCell>Até as</TableCell>
              <TableCell>Opções</TableCell>   
            </TableRow>
          </TableHead>

          <TableBody>
            { rows.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {row.day}
                </TableCell>

                <TableCell align="center">
                  {row.open}
                </TableCell>

                <TableCell align="center">
                  {row.t}
                </TableCell>

                <TableCell align="center">
                  {row.op}
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
          </div>
        </div>
      </form>
    </>
  );
};
