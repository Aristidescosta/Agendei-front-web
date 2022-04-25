//Importações dos hooks
import { Link } from 'react-router-dom';
import { FormNewsEstablishment } from '../../components/form/FormNewsEstablishment';

//Importação do estilo
import '../../styles/newEstablishment.scss';

export const NewEstablishment = () => {
  const newEstablishmentTemplate = (
    <>
      <div>
        <h1>Adicionar novo estabelecimento</h1>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to='/establishments'>Estabelecimentos</Link>
          </li>
          <li className='breadcrumb-item'>Novo</li>
        </ol>
      </div>
      <FormNewsEstablishment />
    </>
  )

  return (
    <section className='newEstablishment'>{newEstablishmentTemplate}</section>
  )
}