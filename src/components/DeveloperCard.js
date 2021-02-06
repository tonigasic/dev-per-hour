import React, {useEffect, useState} from 'react';
import '../assets/css/DeveloperCard.css';
import {Avatar, Button, IconButton} from "@material-ui/core";
import RoomIcon from '@material-ui/icons/Room';
import Chip from '@material-ui/core/Chip';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";

function DeveloperCard({id, name, profession, city, countryCode, picture, skills}) {
    const user = useSelector(selectUser);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        if (user && user.isLoggedIn) {
            setUserLoggedIn(true);
        }
    }, [user]);

    return (
        <div className="developerCard">
            <div className="developerCard__avatar">
                <IconButton>
                    <Link to={'/developers/profile'}>
                        <Avatar
                            src={picture || ''}
                        />
                    </Link>
                </IconButton>
            </div>
            <div className="developerCard__infos">
                <h2>{name}</h2><br/>
                <p>{profession}</p><br/>
                <span><RoomIcon/> {city}, {countryCode}</span><br/>
                <div className="developerCard__infosChips">
                    { skills && skills.length > 0 ?
                        skills.map((skill, index) => {
                            return <Chip label={skill} key={index} />
                        })
                        :
                        <Chip label="No Skills" />
                    }
                </div>
            </div>
            <div className="developerCard__buttons">
                <div>
                    <strong>€15 <small>/hr</small></strong>
                </div>
                <div>
                    { userLoggedIn ?
                        <Link to={'/developers/contact'}>
                            <Button variant="contained">Contact</Button>
                        </Link>
                        :
                        <Button disabled variant="contained">Contact</Button>
                    }
                </div>
                <div>
                    <Link to={'/developers/profile'}>
                        <Button color="primary">View Profile</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DeveloperCard;
