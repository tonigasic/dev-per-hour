import React, {useEffect, useState} from "react";
import '../assets/css/UserEdit.css'
import TextField from "@material-ui/core/TextField";
import Radium, {StyleRoot} from "radium";
import {fadeIn} from "react-animations";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {InputAdornment} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import {postRequest, putRequest} from "../Request";

function UserEdit () {
    const user = useSelector(selectUser);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user || !user.isLoggedIn || !user.user) {
            history.push('/login')
        }
    }, []);

    const styles = {
        fadeIn: {
            animation: 'x 2s',
            animationName: Radium.keyframes(fadeIn, 'fadeIn')
        },
    };

    useEffect(() => {
        if (user && user.isLoggedIn && user.user) {
            setEmail(user.user.email);
            setFirstName(user.user.first_name);
            setLastName(user.user.last_name);
        }
    }, [user]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setOpenSuccessSnackbar(false);
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const saveUser = () => {
        if (validateUserRequest()) {
            let body = {
                firstName: firstName,
                lastName:lastName,
                password: newPassword || null
            };

            new Promise((resolve, reject) => {
                let path = '/user/' + user.user._id;
                putRequest(path, body, resolve, reject);
            })
                .then((response) => {
                    if (response.status === 200 && response.data) {
                        relogin();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                    setErrorMessage(err);
                    setOpenSnackbar(true);
                })
        }
    };

    const relogin = () => {
        new Promise((resolve, reject) => {
            let path = '/authenticate';
            let body = {
                email: email,
                password: newPassword || user.user.password,
                hashed: !newPassword
            };
            postRequest(path, body, resolve, reject);
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data)
                    dispatch({
                        type: 'SET_USER',
                        payload: response.data
                    })
                    setIsLoading(false);
                    setOpenSuccessSnackbar(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err);
                setOpenSnackbar(true);
            })

    };

    const validateUserRequest = () => {
        if (firstName.trim() === '') {
            setErrorMessage('Please enter your first name');
            setOpenSnackbar(true);
            setIsLoading(false);
            return false;
        }
        if (lastName.trim() === '') {
            setErrorMessage('Please enter your last name');
            setOpenSnackbar(true);
            setIsLoading(false);
            return false;
        }
        if (newPassword.trim() !== '') {
            if (newPassword.trim().length < 9) {
                setErrorMessage('Minimal password length is 8 characters');
                setOpenSnackbar(true);
                setIsLoading(false);
                return false;
            }
            if (newPassword.trim() !== repeatPassword.trim()) {
                setErrorMessage('Please repeat the password correctly');
                setOpenSnackbar(true);
                setIsLoading(false);
                return false;
            }
        }

        return true;
    }

    return (
        <div className="userEdit">
            <LoadingOverlay
                active={isLoading}
                spinner
                text='Loading your content...'
            >
                <StyleRoot style={styles.fadeIn} className="userEdit__div">
                    <div className="userEdit__body">
                        <div>
                            <h1>Account Settings</h1>
                        </div>
                        <div className="userEdit__inputs">
                            <div className="userEdit__inputsRole">
                                <TextField label="Account Type" variant="outlined" size="small" value={'Freelancer'} disabled />
                            </div>
                            <div className="userEdit__inputsEmail">
                                <TextField label="Email" variant="outlined" size="small" value={email} onChange={e => setEmail(e.target.value)} disabled />
                            </div>
                            <div className="userEdit__inputsNameSurname">
                                <TextField label="First Name" variant="outlined" size="small" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                                <TextField label="Last Name" variant="outlined" size="small" value={lastName} onChange={e => setLastName(e.target.value)} />
                            </div>
                            <div className="userEdit__inputsPassword">
                                <TextField
                                    label="New Password"
                                    variant="outlined"
                                    size="small"
                                    type="password"
                                    autoComplete="new-password"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="userEdit__inputsPassword">
                                <TextField
                                    label="Repeat New Password"
                                    variant="outlined"
                                    size="small"
                                    type="password"
                                    autoComplete="new-password"
                                    value={repeatPassword}
                                    onChange={e => setRepeatPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                { newPassword === repeatPassword && newPassword !== '' ?
                                                    <CheckCircleIcon className="userEdit__passwordIcon" />
                                                    :
                                                    ''
                                                }
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </div>
                        </div>
                        <div className="userEdit__button">
                            <div>
                                <button className="userEdit__saveButton" onClick={saveUser} >Save</button>
                            </div>
                        </div>
                    </div>
                </StyleRoot>
            </LoadingOverlay>
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

export default UserEdit;