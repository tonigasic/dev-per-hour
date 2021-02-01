import React, {useEffect, useState} from "react";
import '../assets/css/Profile.css';
import ModalImage from "react-modal-image";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";

function Profile() {
    const user = useSelector(selectUser);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        if (user && user.isLoggedIn) {
            setUserLoggedIn(true);
        }
    }, [user]);

    return (
        <div className="profile__root">
            <div className="profile">
                <div className="profile__container">
                    <div className="profile__containerLeft">
                        <div className="profile__imageContainer">
                            <ModalImage
                                className="profile__image"
                                small={'https://i.stack.imgur.com/l60Hf.png'}
                                large={'https://i.stack.imgur.com/l60Hf.png'}
                                alt=""
                            />
                        </div>
                        <div className="profile__skills">
                            <h3>Skills</h3><br/>
                            <h4>Web Developer</h4>
                            <h4>Web Designer</h4>
                            <h4>Word Press</h4>
                            <h4>JavaScript</h4>
                            <h4>Java</h4>
                        </div>
                        <div className="profile__skills">
                            <h3>Hobby's</h3><br/>
                            <h4>Sport</h4>
                            <h4>Art</h4>
                            <h4>Driving</h4>
                        </div>
                    </div>
                    <div className="profile__containerRight">
                        <div>
                            <div className="profile__name">
                                <h2>Mr. Developer</h2><br/>
                                <h3>Junior Web Developer</h3><br/>
                                <h4>Ratings: 7/10</h4>
                            </div>
                            <div className="profile__contactButton">
                                { userLoggedIn ?
                                    <Link to={'/developers/contact'}>
                                        <Button variant="contained">Contact</Button>
                                    </Link>
                                    :
                                    <Button disabled variant="contained">Contact</Button>
                                }
                            </div>
                        </div>

                        <br/>
                        <br/>
                        <hr/>
                        <div className="profile__details">
                            <h3>Details</h3>
                            <br/>
                            <div className="profile__detailsInfo">
                                <div>
                                    <div className="profile__detailsInfoKey">
                                        <strong>Name</strong>
                                    </div>
                                    <div className="profile__detailsInfoValue">
                                        <span>Mr. Developer</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="profile__detailsInfoKey">
                                        <strong>Email</strong>
                                    </div>
                                    <div className="profile__detailsInfoValue">
                                        <span>mr-developer@gmail.com</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="profile__detailsInfoKey">
                                        <strong>Phone</strong>
                                    </div>
                                    <div className="profile__detailsInfoValue">
                                        <span>+491 / 489 - 4568</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="profile__detailsInfoKey">
                                        <strong>Profession</strong>
                                    </div>
                                    <div className="profile__detailsInfoValue">
                                        <span>Junior Web Developer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile__about">
                            <h3>About Mr. Developer</h3><br/>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                                it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;