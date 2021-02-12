import React, {useEffect, useState} from "react";
import './../assets/css/JobCard.css';
import Chip from "@material-ui/core/Chip";
import ShowMoreText from 'react-show-more-text';
import {Link} from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import {IconButton} from "@material-ui/core";
import {putRequest} from "../Request";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function JobCard({id, title, description, duration, duration_type, experience, hours_high, hours_low, price_high, price_low, skills, isFavorite, reloadJobs}) {
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
        let savedJobs = user.user.saved_jobs ? [...user.user.saved_jobs] : [];

        if (isFavorite) {
            let index = savedJobs.findIndex(job => job === id);

            if (index !== -1) {
                savedJobs.splice(index, 1);
            }
        }
        else {
            savedJobs.push(id);
        }

        let body = {
            savedJobs: savedJobs
        };

        new Promise((resolve, reject) => {
            let path = '/user/' + user.user._id + '/job';
            putRequest(path, body, resolve, reject);
        })
            .then((response) => {
                if (response.status === 200 && response.data) {
                    dispatch({
                        type: 'SET_USER_SAVED_JOBS',
                        payload: savedJobs
                    });
                    if (reloadJobs) {
                        reloadJobs();
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
        <div className="jobCard">
            <div className="jobCard__header">
                <div className="jobCard__title">
                    <Link to={'/jobs/description/' + id}>
                        <h3>{title}</h3>
                    </Link>
                </div>
                <div className="jobCard__favorite">
                    <IconButton onClick={updateUser} title="Favorite">
                        { isFavorite ?
                            <FavoriteIcon style={{ color: 'red' }} />
                            :
                            <FavoriteBorderIcon style={{ color: 'red' }} />
                        }
                    </IconButton>
                </div>
            </div>
            <br/>
            <div className="jobCard__price">
                <h4>Hourly: €{price_low}-€{price_high}</h4>
            </div>
            <br/>
            <div className="jobCard__info">
                <div>
                    <strong>{hours_low}-{hours_high} hrs/week</strong>
                    <p>Hours Needed</p>
                </div>
                <div>
                    <strong>{duration + ' ' + duration_type + 's'}</strong>
                    <p>Duration</p>
                </div>
                <div>
                    <strong>{experience}</strong>
                    <p>Experience Level</p>
                </div>
            </div>
            <br/>
            <div className="jobCard__description">
                <ShowMoreText
                    lines={2}
                    more='More'
                    less='Less'
                    anchorClass=''
                    expanded={false}
                >
                    {description}
                </ShowMoreText>
            </div>
            <br/>
            <div className="jobCard__skills">
                { skills && skills.length > 0 ?
                    skills.map((skill, index) => {
                        return <Chip label={skill} key={index} />
                    })
                    :
                    <Chip label="No Skills" />
                }
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
    )
}

export default JobCard;