import React from "react";
import { Home, Person, Storefront } from "@material-ui/icons";
import { Link } from "react-router-dom"
import "../styles/sidebar.scss";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
              <Link to={"/"}>
                <Home className="sidebarIcon"/>
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu rápido</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Link to={"/user/profile"}>
                <Person className="sidebarIcon" />
                Perfil
              </Link>
            </li>

            <li className="sidebarListItem">
              <Link to={"/establishments"}>
                <Storefront className="sidebarIcon" />
                Estabelecimentos
              </Link>
            </li>
          </ul>
        </div>
    </aside>
  );
}