const Button = ({ type }) => {
  return <button className={"widget-button " + type}>{type}</button>;
};

export const WidgetList = ({userName, userEmail, userAvatar, data, buttonType, price}) => {
  return (
    <tr className="widget-tr">
      <td className="widget-users">
        <img src={ userAvatar } alt="imagem de um usuário" className="widget-img" />
        <span className="widget-name">{ userName }</span>
      </td>

      <td className="widget-date">{ data }</td>
      <td className="widget-date">{ userEmail }</td>
      <td className="widget-amount">{ price }</td>
      <td className="widget-status">
        <Button type={buttonType} />
      </td>
    </tr>
  );
};
