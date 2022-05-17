import { LocationOnOutlined, StarBorderOutlined } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { List } from "react-content-loader";
import { Link, useParams } from "react-router-dom";
import { dev } from "../../config/config";
import {
  Button,
  makeStyles,
  Theme,
  createStyles,
  ImageList,
  ImageListItem,
} from "@material-ui/core";
import { AuthContext } from "../../contexts/auth/AuthContext";
import img from "../../components/assets/img/agendei/bg.jpg";
import img1 from "../../components/assets/img/agendei/bg1.jpg";
import img2 from "../../components/assets/img/agendei/bg2.jpg";
import img3 from "../../components/assets/img/agendei/bg3.jpg";
import img4 from "../../components/assets/img/agendei/bg4.jpg";
import img5 from "../../components/assets/img/agendei/bg5.jpg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      width: 1000,
      height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  })
);

interface imageType {
  img: string;
  title: string;
}

export const EstablishmentDetails = () => {
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const [itemData, setItemData] = useState<Array<imageType>>([
    {
      img: img,
      title: "Imagem do estabelecimento",
    },

    {
      img: img1,
      title: "Imagem do estabelecimento",
    },

    {
      img: img2,
      title: "Imagem do estabelecimento",
    },
  ]);
  const classes = useStyles();

  useEffect(() => {
    auth.setEst(undefined);
    if (id) auth.getOneEstablishment(id);
  }, []);
  return (
    <>
      {!auth.establishment ? (
        <List />
      ) : (
        <section className="establishmentDetails">
          <div className="row">
            <div className="col-md-3 col-lg-3">
              <img src={`${dev.API_URL}/${auth.establishment.img}`} alt="" />
            </div>

            <div className="col-md-9 col-lg-9">
              <div className="text-center">
                <p>{auth.establishment.name}</p>
                <div>
                  <LocationOnOutlined />
                  <span>{auth.establishment.address}</span>
                </div>
              </div>
              <p>{auth.establishment.category.name}</p>

              <div className="raking">
                <p>Rankings</p>
                <div>
                  <span>{auth.establishment.ratingmedia}</span>
                  <ul>
                    <li>
                      <StarBorderOutlined />
                    </li>
                    <li>
                      <StarBorderOutlined />
                    </li>
                    <li>
                      <StarBorderOutlined />
                    </li>
                    <li>
                      <StarBorderOutlined />
                    </li>
                    <li>
                      <StarBorderOutlined />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-lg-3">
              <p>
                Detalhes{" "}
                <span>
                  <hr />
                </span>
              </p>

              <div>
                <p>Telefones</p>
                <span>{auth.establishment.phones_number[0]}</span>
                <span>{auth.establishment.phones_number[1]}</span>
              </div>

              <div>
                <p>Data de criação</p>
                <span>{auth.establishment.createdAt}</span>
              </div>

              <div>
                <p>Última alteração</p>
                <span>{auth.establishment.updatedAt}</span>
              </div>

              <div>
                <p>Nº de serviços</p>
                <span>{auth.establishment.services.length}</span>
              </div>

              <div>
                <Link to={`services`}>
                  <Button>Ver serviços</Button>
                </Link>
              </div>
            </div>

            <div className="col-md-9 col-lg-9">
              <p>
                Galeria de imagens{" "}
                <span>
                  <hr />
                </span>
              </p>

              {itemData.length === 0 ? (
                <p className="text-info">Galeria de imagens vazia</p>
              ) : (
                <div className={classes.root}>
                  <ImageList rowHeight={180} className={classes.imageList}>
                    {itemData.map((item) => (
                      <ImageListItem key={item.img}>
                        <img src={item.img} alt={item.title} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
