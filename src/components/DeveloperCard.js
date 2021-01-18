import React from 'react';
import '../assets/css/DeveloperCard.css';
import {Avatar, Button, IconButton} from "@material-ui/core";
import RoomIcon from '@material-ui/icons/Room';
import Chip from '@material-ui/core/Chip';
import {Link} from "react-router-dom";

function DeveloperCard() {
    return (
        <div className="developerCard">
            <div className="developerCard__avatar">
                <IconButton>
                    <Link to={'/contact/dev'}>
                        <Avatar

                        />
                    </Link>
                </IconButton>
            </div>
            <div className="developerCard__infos">
                <h2>Larisa P.</h2><br/>
                <p>Translator from Germany, Spanish, French, Roumanian and others to English</p><br/>
                <span><RoomIcon/> FRANKFURT AM MAIN, DE</span><br/>
                <div className="developerCard__infosChips">
                    <Chip label="Basic" />
                    <Chip label="Basic" />
                    <Chip label="Basic" />
                    <Chip label="Basic" />
                    <Chip label="Basic" />
                    <Chip label="Basic" />
                </div>
            </div>
            <div className="developerCard__buttons">
                <div>
                    <strong>€15 <small>/hr</small></strong>
                </div>
                <div>
                    <Link to={'/contact/dev'}>
                        <Button variant="contained">Contact</Button>
                    </Link>
                </div>
                <div>
                    <Button color="primary">View Profile</Button>
                </div>
            </div>
        </div>
    );
}

export default DeveloperCard;
