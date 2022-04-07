import React from "react"

import "../styles/widget.scss";
import Avatar from "./assets/img/user.jpg";
import { clientsRows } from "../data";
import { WidgetList } from "./WidgetList";

const Widget = () => {

  const widgetList = clientsRows.map((widgets) => (
    <WidgetList
        id={widgets.id}
        userName={widgets.clientsName}
        userEmail={widgets.email}
        userAvatar={widgets.avatar}
        data={widgets.data}
        price={widgets.transition}
        buttonType={widgets.buttonType}
        key={widgets.id}
    />
  ));
  return (
    <div className="card">
      <div className="card-body">
      <div className="card-title">Últimos agendamentos</div>
      <table className="widget-table">
        <tr className="widget-tr">
          <th className="widget-th">Costumer</th>
          <th className="widget-th">Data</th>
          <th className="widget-th">Email</th>
          <th className="widget-th">Valor</th>
          <th className="widget-th">Status</th>
        </tr>

        { widgetList }
      </table>
    </div>
    </div>
  );
};

export default Widget;
