//Importações dos hooks
import { FormNewsEstablishment } from "../../components/form/FormNewsEstablishment";
import "./newsEstablishment.scss";

export const NewEstablishment = () => {
  const newEstablishmentTemplate = (
      <FormNewsEstablishment />
  );

  return (
    <section className="newEstablishment">{newEstablishmentTemplate}</section>
  );
};
