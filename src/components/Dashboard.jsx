import "../styles/dashboard.scss";
import Widget from "./Widget";
import Chart from "./charts/Chart";
import { userData } from "../data";
import { Featured } from "./Featured";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <section className="dashboard">
      <div>
        <h1>Dashboard</h1>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">Dashboard</li>
        </ol>
      </div>
      <div className="row">
        <div className="col-lg-12 feature">
          <Featured />
        </div>
        <div className="col-lg-12">
          <Chart
            data={userData}
            title="Análise de clientes"
            grid
            dataKey="Clientes"
          />
        </div>
        <div className="col-lg-12">
          <Widget />
        </div>
      </div>
    </section>
  );
}
