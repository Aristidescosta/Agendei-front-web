import React from "react";
import { useState, useContext } from "react";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import logo from "./assets/img/logo.png";
import { AuthContext } from "../contexts/auth/AuthContext";
import "../styles/topbar.scss";
import { Link } from "react-router-dom";

export const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
        <Avatar className="img-avatar" />

        <span>{auth.user?.username}</span>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <Link onClick={handleClose} to="/user/profile">Perfil</Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        </Menu>
      </div>
    </nav>
  );
};
