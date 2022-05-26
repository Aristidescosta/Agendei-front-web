//Importações dos hooks
import { FormEdit } from "../../components/form/FormEdit";
import "./newsEstablishment.scss";

export const Edit = () => {
  const newEstablishmentTemplate = (
    <>
      {/* <div>
        <h1>Adicionar novo estabelecimento</h1>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Estabelecimentos</Link>
          </li>
          <li className="breadcrumb-item">Novo</li>
        </ol>
      </div> */}

      <FormEdit />
    </>
  );

  return (
    <section className="newEstablishment">
      {newEstablishmentTemplate}
    </section>
  );
};
