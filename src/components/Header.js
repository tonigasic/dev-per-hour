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
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isFreelancer, setIsFreelancer] = useState(null);
    const [displayName, setDisplayName] = useState(null);
    const [showUserExtraMenu, setShowUserExtraMenu] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (user && user.isLoggedIn) {
            setUserLoggedIn(true);
            setDisplayName(user.user.first_name + ' ' + user.user.last_name);

            if (user.user && user.user.roles && user.user.roles.length > 0) {
                user.user.roles[0] == 1 ? setIsFreelancer(true) : setIsFreelancer(false);
            }
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
                { userLoggedIn && displayName ?
                    <div className="header__menuOptionWithName">
                        <span className="header__optionLineOne">Hello {displayName}</span>
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
                <div className="header__menuOption">
                    <div className="header__option">
                        <span className="header__optionLineOne">Developers</span>
                    </div>
                    <div className="header__submenu">
                        <Link to={"/developers"}>
                            <div>Hire Developers</div>
                        </Link>
                        <Link to={"/developers/saved"}>
                            <div>Saved Developers</div>
                        </Link>
                    </div>
                </div>
                <div className="header__menuOption">
                    <div className="header__option">
                        <span className="header__optionLineOne">Jobs</span>
                    </div>
                    <div className="header__submenu">
                        <Link to={"/jobs"}>
                            <div>Find Job</div>
                        </Link>
                        <Link to={"/jobs/saved"}>
                            <div>Saved Jobs</div>
                        </Link>
                        {!isFreelancer ?
                            <Link to={"/jobs/user"}>
                                <div>My Jobs</div>
                            </Link>
                            :
                            ''
                        }
                        <div>Post A Job</div>
                    </div>
                </div>
                { userLoggedIn ?
                    <div className="header__menuOptionAvatar">
                        <div className="header__option">
                            <IconButton onClick={e => setShowUserExtraMenu(!showUserExtraMenu)}>
                                <Avatar src={DefaultAvatar}/>
                            </IconButton>
                        </div>
                        <div className="header__submenu">
                            <Link to={isFreelancer ? '/freelancer/profile' : '/company/profile'}>
                                <div>My Profile</div>
                            </Link>
                            <Link to={"/user/profile"}>
                                <div>Account</div>
                            </Link>
                            <div onClick={logout}>Sing Out</div>
                        </div>
                    </div>
                    :
                    ''
                }
            </div>
        </div>
    )
}

export default Header;