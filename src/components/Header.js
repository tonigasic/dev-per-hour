import React, {useEffect, useState} from 'react';
import '../assets/css/Header.css';
import Logo from '../assets/img/dev-per-hour-logo.png'
import DefaultAvatar from '../assets/img/default-avatar.png'
import {Link, useHistory} from "react-router-dom";
import {Avatar, IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";

function Header() {
    const user = useSelector(selectUser);
    const [displayName, setDisplayName] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (user && user.isLoggedIn) {
            setDisplayName(user.user.first_name + ' ' + user.user.last_name);
        }
    }, [user]);

    const logout = () => {
        dispatch({
            type: 'REMOVE_USER'
        });

        history.push('/login');
    };

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
                    { displayName ?
                        <div className="header__menuOptionWithName" onClick={logout}>
                            <span className="header__optionDisplayBane">Hello {displayName}</span>
                            <span className="header__optionLineOne">Sign Out</span>
                        </div>
                        :
                        <Link to={"/login"}>
                            <div className="header__menuOption">
                                <div className="header__option">
                                    <span className="header__optionLineOne">Sign In</span>
                                </div>
                            </div>
                        </Link>
                    }
                <Link to={"/developers"}>
                    <div className="header__menuOption">
                        <div className="header__option">
                            <span className="header__optionLineOne">Developers</span>
                        </div>
                    </div>
                </Link>
                <Link to={"/jobs"}>
                    <div className="header__menuOption">
                        <div className="header__option">
                            <span className="header__optionLineOne">Jobs</span>
                        </div>
                    </div>
                </Link>
                <Link to={"/history"}>
                    <div className="header__menuOption">
                        <div className="header__option">
                            <span className="header__optionLineOne">History</span>
                        </div>
                    </div>
                </Link>
                <Link to={"/profile"}>
                    <div className="header__menuOptionAvatar">
                        <div className="header__option">
                            <IconButton>
                                <Avatar src={DefaultAvatar}/>
                            </IconButton>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header;