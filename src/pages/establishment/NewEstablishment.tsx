//Importações dos hooks
import { Link } from "react-router-dom";
import { FormNewsEstablishment } from "../../components/form/FormNewsEstablishment";
import "./establishment.scss";
import avatar from "../../components/assets/img/add.svg"


export const NewEstablishment = () => {
  const newEstablishmentTemplate = (
    <>
      <div>
        <h1>Adicionar novo estabelecimento</h1>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Estabelecimentos</Link>
          </li>
          <li className="breadcrumb-item">Novo</li>
        </ol>
      </div>
      
      <div className="addEstablishment">
        <FormNewsEstablishment />
        <img src={avatar} alt="imagem ilustrando uma página de adição" />
      </div>
    </>
  );

  return (
    <section className="newEstablishment">{newEstablishmentTemplate}</section>
  );
};
