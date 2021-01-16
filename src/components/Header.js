import React from 'react';
import '../assets/css/Header.css';
import Logo from '../assets/img/dev-per-hour-logo.png'
import DefaultAvatar from '../assets/img/default-avatar.png'
import {Link} from "react-router-dom";
import {Avatar, IconButton} from "@material-ui/core";

function Header() {
    return (
        <div className="header">
            <div className="header__logo">
                <Link to={"/"}>
                    <img
                        src={Logo}
                        alt=""
                    />
                </Link>
            </div>
            <div className="header__menu">
                <div className="header__menuOption">
                    <Link to={"/login"}>
                        <div className="header__option">
                            <span className="header__optionLineOne">Sign In</span>
                        </div>
                    </Link>
                </div>
                <div className="header__menuOption">
                    <Link to={"/developers"}>
                        <div className="header__option">
                            <span className="header__optionLineOne">Developers</span>
                        </div>
                    </Link>
                </div>
                <div className="header__menuOption">
                    <Link to={"/jobs"}>
                        <div className="header__option">
                            <span className="header__optionLineOne">Jobs</span>
                        </div>
                    </Link>
                </div>
                <div className="header__menuOption">
                    <Link to={"/history"}>
                        <div className="header__option">
                            <span className="header__optionLineOne">History</span>
                        </div>
                    </Link>
                </div>
                <div className="header__menuOptionAvatar">
                    <Link to={"/profile"}>
                        <div className="header__option">
                            <IconButton>
                                <Avatar src={DefaultAvatar}/>
                            </IconButton>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header;