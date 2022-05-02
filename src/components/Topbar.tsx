import React from "react";
import { useState, useContext } from "react";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import logo from "./assets/img/logo.png";
import { AuthContext } from "../contexts/auth/AuthContext";
import "../styles/topbar.scss";
import { Link } from "react-router-dom";
import { AccountBox, ExitToApp, Settings } from "@material-ui/icons";

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
        <Link to="/">
        <img src={logo} className="logo" alt="logotipo do agendei" />
        </Link>
      </div>

      <div className="topbarRight">
        <Avatar
          className="img-avatar"
          aria-controls="topbar-menu"
          aria-haspopup="true"
          onClick={handleClick}
        />

        <Menu
          id="topbar-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <AccountBox />
            <Link onClick={handleClose} to="/user/account">
              Minha conta
            </Link>
          </MenuItem>

          <MenuItem>
            <Settings />
            <Link onClick={handleClose} to="user/setting">
              Configurações
            </Link>
          </MenuItem>

          <MenuItem>
          <ExitToApp />
            <Link to="#logout" onClick={handleLogout}>
            Sair
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};
