import React, {useEffect, useState} from "react";
import '../assets/css/ContactDeveloper.css';
import TextField from '@material-ui/core/TextField';
import {Avatar, Button} from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";
import {useHistory, useParams} from "react-router-dom";
import {getRequest} from "../Request";
import Snackbar from "@material-ui/core/Snackbar";
import NoData from "../components/NoData";
import MuiAlert from "@material-ui/lab/Alert";

function ContactDeveloper() {
    const user = useSelector(selectUser);
    const history = useHistory();
    const [developer, setDeveloper] = useState({});
    const [render, setRender] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const { id } = useParams();

    useEffect(()=> {
        if (id && user.isLoggedIn) {
            new Promise((resolve, reject) => {
                let path = '/freelancer/' + id;
                getRequest(path, resolve, reject);
            })
                .then((response) => {
                    if (response.status === 200 && response.data) {
                        setDeveloper(response.data);
                        setRender(true);
                        console.log(response.data)
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setErrorMessage(err);
                    setOpenSnackbar(true);
                })
        }
    }, [id]);

    const handleCloseSnackbar = (event, reason) => {
        setOpenSnackbar(false);
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    return (
        <div className="contactDeveloper">
            <div className="contactDeveloper__container">
                <div className="contactDeveloper__text">
                    <h1>Contact Mr. Developer!</h1>
                </div>
                { render ?
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
                                    <h2>{developer.name}</h2><br/>
                                    <div>
                                        <p>{developer.profession}</p>
                                        <strong>€{developer.price} <small>/hr</small></strong>
                                    </div>
                                    <hr/>
                                </div>
                                <div className="contactDeveloper__developerCardText">
                                    <div dangerouslySetInnerHTML={{__html: developer.about}}></div>
                                    <hr/>
                                </div>
                                <div className="contactDeveloper__developerCardLocation">
                                    <span><RoomIcon/> {developer.address.city}, {developer.address.countryCode}</span><br/>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <NoData/>
                }
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ContactDeveloper;