import React from "react";
import '../assets/css/ContactDeveloper.css';
import TextField from '@material-ui/core/TextField';
import {Avatar, Button} from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";

function ContactDeveloper() {
    return (
        <div className="contactDeveloper">
            <div className="contactDeveloper__container">
                <div className="contactDeveloper__text">
                    <h1>Contact Mr. Developer!</h1>
                </div>
                <div className="contactDeveloper__body">
                    <div className="contactDeveloper__inputs">
                        <div className="contactDeveloper__inputsNameSurname">
                            <TextField label="FIRST NAME" variant="outlined" size="small" />
                            <TextField label="LAST NAME" variant="outlined" size="small" />
                        </div>
                        <div className="contactDeveloper__input">
                            <TextField label="EMAIL" variant="outlined" size="small" />
                        </div>
                        <div className="contactDeveloper__input">
                            <TextField label="WHAT DO YOU NEED TO GET DONE" variant="outlined" size="small" />
                        </div>
                        <div className="contactDeveloper__input">
                            <TextField
                                label="DESCRIPTION"
                                variant="outlined"
                                size="small"
                                multiline
                                rows={10}
                            />
                        </div>
                        <div className="contactDeveloper__button">
                            <Button variant="contained">Send</Button>
                        </div>
                    </div>
                    <div className="contactDeveloper__developerCard">
                        <div className="contactDeveloper__developerCardContainer">
                            <div className="contactDeveloper__developerCardAvatar">
                                <Avatar/>
                            </div>
                            <div className="contactDeveloper__developerCardHeader">
                                <h2>Mr. Developer</h2><br/>
                                <div>
                                    <p>Front-End Developer</p>
                                    <strong>€15 <small>/hr</small></strong>
                                </div>
                                <hr/>
                            </div>
                            <div className="contactDeveloper__developerCardText">
                                <p>Hi, I 'm Mr. Developer. I love transforming ideas into digital products. For you I can produce high quality applications and exceptional user experience.</p>
                                <hr/>
                            </div>
                            <div className="contactDeveloper__developerCardLocation">
                                <span><RoomIcon/> FRANKFURT AM MAIN, DE</span><br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactDeveloper;