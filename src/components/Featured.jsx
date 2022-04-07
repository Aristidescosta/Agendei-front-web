import React from "react";
import "../styles/featured.scss";
import { ArrowDownwardOutlined, ArrowUpwardOutlined } from "@material-ui/icons";

export const Featured = () => {
  return (
    <div className="row">
      <div className="col-lg-4 col-md-6">
        <div className="card">
          <div className="card-body">
            <span className="card-title">Serviços</span>
            <div className="featureMoneyContainer">
              <span className="featuredMoney">3400.23kzs</span>
              <span className="featuredMoneyRate">
                -18400.00kzs{" "}
                <ArrowDownwardOutlined className="featured-icon negative" />
              </span>
            </div>
            <span className="featuredSub">Comparado com o último mês</span>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="card">
          <div className="card-body">
            <span className="card-title">Serviços</span>
            <div className="featureMoneyContainer">
              <span className="featuredMoney">3400.23kzs</span>
              <span className="featuredMoneyRate">
                -18400.00kzs{" "}
                <ArrowDownwardOutlined className="featured-icon negative" />
              </span>
            </div>
            <span className="featuredSub">Comparado com o último mês</span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6">
        <div className="card">
          <div className="card-body">
            <span className="card-title">Serviços</span>
            <div className="featureMoneyContainer">
              <span className="featuredMoney">3400.23kzs</span>
              <span className="featuredMoneyRate">
                -18400.00kzs{" "}
                <ArrowDownwardOutlined className="featured-icon negative" />
              </span>
            </div>
            <span className="featuredSub">Comparado com o último mês</span>
          </div>
        </div>
      </div>
    </div>
  );
};
