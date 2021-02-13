import React, {useEffect, useState} from "react";
import '../assets/css/Profile.css';
import ModalImage from "react-modal-image";
import {Button} from "@material-ui/core";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";
import {getRequest} from "../Request";
import NoData from "../components/NoData";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import DefaultImage from './../assets/img/default-avatar.png'

function Profile() {
    const user = useSelector(selectUser);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [developer, setDeveloper] = useState({});
    const [render, setRender] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (user && user.isLoggedIn) {
            setUserLoggedIn(true);
        }
    }, [user]);

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
        <div className="profile__root">
            <div className="profile">
                { render ?
                    <div className="profile__container">
                        <div className="profile__containerLeft">
                            <div className="profile__imageContainer">
                                <ModalImage
                                    className="profile__image"
                                    small={developer.picture || DefaultImage}
                                    large={developer.picture || DefaultImage}
                                    alt=""
                                />
                            </div>
                            <div className="profile__skills">
                                <h3>Skills</h3><br/>
                                { Array.isArray(developer.skills) ?
                                    developer.skills.map((skill, index) => {
                                        return <h4 key={index}>{skill}</h4>
                                    })
                                    : <h4>No Skills</h4>
                                }
                            </div>
                            <div className="profile__skills">
                                <h3>Hobby's</h3><br/>
                                { Array.isArray(developer.skills) ?
                                    developer.hobbys.map((hobby, index) => {
                                        return <h4 key={index}>{hobby}</h4>
                                    })
                                    : <h4>No Hobby's</h4>
                                }
                            </div>
                        </div>
                        <div className="profile__containerRight">
                            <div>
                                <div className="profile__name">
                                    <h2>{developer.name}</h2><br/>
                                    <h3>{developer.profession}</h3><br/>
                                    <h4>Ratings: {developer.rating}/10</h4>
                                </div>
                                <div className="profile__contactButton">
                                    { userLoggedIn ?
                                        <Link to={'/developers/contact/'+id}>
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
                                            <span>{developer.name}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="profile__detailsInfoKey">
                                            <strong>Email</strong>
                                        </div>
                                        <div className="profile__detailsInfoValue">
                                            <span>{developer.email}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="profile__detailsInfoKey">
                                            <strong>Phone</strong>
                                        </div>
                                        <div className="profile__detailsInfoValue">
                                            <span>{developer.phone}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="profile__detailsInfoKey">
                                            <strong>Profession</strong>
                                        </div>
                                        <div className="profile__detailsInfoValue">
                                            <span>{developer.profession}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="profile__about">
                                <h3>About Mr. Developer</h3><br/>
                                <div dangerouslySetInnerHTML={{__html: developer.about}}>

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

export default Profile;