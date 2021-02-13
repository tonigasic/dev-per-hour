import React, {useEffect, useState} from 'react';
import '../assets/css/DeveloperCard.css';
import {Avatar, Button, IconButton} from "@material-ui/core";
import RoomIcon from '@material-ui/icons/Room';
import Chip from '@material-ui/core/Chip';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {putRequest} from "../Request";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function DeveloperCard({id, name, profession, city, countryCode, picture, skills, price, isFavorite, reloadDevelopers}) {
    const user = useSelector(selectUser);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && user.isLoggedIn) {
            setUserLoggedIn(true);
        }
    }, [user]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setOpenSuccessSnackbar(false);
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const updateUser = () => {
        let savedDevelopers = user.user.saved_developers ? [...user.user.saved_developers] : [];

        if (isFavorite) {
            let index = savedDevelopers.findIndex(dev => dev === id);

            if (index !== -1) {
                savedDevelopers.splice(index, 1);
            }
        }
        else {
            savedDevelopers.push(id);
        }

        let body = {
            savedDevelopers: savedDevelopers
        };

        new Promise((resolve, reject) => {
            let path = '/user/' + user.user._id + '/developer';
            putRequest(path, body, resolve, reject);
        })
            .then((response) => {
                if (response.status === 200 && response.data) {
                    dispatch({
                        type: 'SET_USER_SAVED_DEVELOPERS',
                        payload: savedDevelopers
                    });
                    if (reloadDevelopers) {
                        reloadDevelopers();
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err);
                setOpenSnackbar(true);
            })
    };

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
                    <strong>€{price || 0} <small>/hr</small></strong>
                </div>
                <div>
                    <IconButton onClick={updateUser} title="Favorite">
                        { isFavorite ?
                            <FavoriteIcon style={{ color: 'red' }} />
                            :
                            <FavoriteBorderIcon style={{ color: 'red' }} />
                        }
                    </IconButton>
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
                    <Link to={'/developers/profile/' + id}>
                        <Button color="primary">View Profile</Button>
                    </Link>
                </div>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Successfully saved data
                </Alert>
            </Snackbar>
        </div>
    );
}

export default DeveloperCard;
