import React from "react";
import { useState, useContext } from "react";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import avatar from "./assets/img/user.jpg";
import logo from "./assets/img/logo.png";
import { AuthContext } from "../contexts/auth/AuthContext";
import "../styles/topbar.scss";
import { Link } from "react-router-dom";

export const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
    window.location.href = window.location.href;
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="topbar">
      <div className="topbarLeft">
        <img src={logo} className="logo" alt="logotipo do agendei" />
      </div>

      <div
        className="topbarRight"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar src={avatar} className="img-avatar" />

        <span>Aristides Costa</span>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/user/profile">Perfil</Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        </Menu>
      </div>
    </nav>
  );
};
