import React, {useEffect, useState} from "react";
import './../assets/css/Registration.css';
import Logo from '../assets/img/dev-per-hour-logo-small.png';
import Radium, {StyleRoot} from "radium";
import {fadeIn} from "react-animations";
import {Link, useHistory} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import {postRequest} from "../Request";
import {Modal} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";

function Registration() {
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('1');
    const [terms, setTerms] = useState(false);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (user && user.isLoggedIn && user.user) {
            history.push('/')
        }
    }, []);

    const styles = {
        fadeIn: {
            animation: 'x 2s',
            animationName: Radium.keyframes(fadeIn, 'fadeIn')
        },
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const registerUser = (e) => {
        e.preventDefault();
        if (validateUser()) {
            new Promise((resolve, reject) => {
                let path = '/user';
                let body = {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    roles: [role]
                };
                postRequest(path, body, resolve, reject);
            })
                .then((response) => {
                    if (response.status === 200) {
                        handleOpen();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setErrorMessage(err);
                    setOpenSnackbar(true);
                })
        }
    };

    const validateUser = () => {
        if (email.trim() === '') {
            setErrorMessage('Please enter your email');
            setOpenSnackbar(true);
            return false;
        }
        if (password.trim() === '') {
            setErrorMessage('Please enter your password');
            setOpenSnackbar(true);
            return false;
        }
        if (password.trim() !== '' && password.length < 9) {
            setErrorMessage('Minimal password length is 8 characters');
            setOpenSnackbar(true);
            return false;
        }
        if (firstName.trim() === '') {
            setErrorMessage('Please enter your first name');
            setOpenSnackbar(true);
            return false;
        }
        if (lastName.trim() === '') {
            setErrorMessage('Please enter your last name');
            setOpenSnackbar(true);
            return false;
        }
        if (!terms) {
            setErrorMessage('Please accept the terms of Service');
            setOpenSnackbar(true);
            return false;
        }
        return true;
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        history.push('/login')
    };

    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const body = (
        <div style={getModalStyle()} className="registration__confirmModal">
            <h2>Registration Completed</h2>
            <br/>
            <br/>
            <p>
                Your registration process ist completed. You can login now.
            </p>
            <br/>
            <br/>
            <button className="registration__signInButton" onClick={e => history.push('/login')}>Go to login page</button>
        </div>
    );

    return (
        <div className="registration">
            <StyleRoot style={styles.fadeIn} className="registration__div">
                <div className="registration__header">
                    <div className="registration__logoContainer">
                        <Link to={'/'}>
                            <img
                                className="registration__logo"
                                src={Logo}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="registration__singInContainer">
                        <p>Already have an account? <Link to={'/login'}><strong>Log In</strong></Link></p>
                    </div>
                </div>
                <div className="registration__body">
                    <div>
                        <h1>Complete your free account setup</h1>
                    </div>
                    <div className="registration__inputs">
                        <div className="registration__inputsEmail">
                            <TextField label="Email" variant="outlined" size="small" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="registration__inputsPassword">
                            <TextField
                                label="Password"
                                variant="outlined"
                                size="small"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="registration__inputsNameSurname">
                            <TextField label="First Name" variant="outlined" size="small" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                            <TextField label="Last Name" variant="outlined" size="small" value={lastName} onChange={e => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="registration__radioButtons">
                        <RadioGroup row aria-label="position" name="position" defaultValue="top" value={role} onChange={e => setRole(e.target.value)}>
                            <FormControlLabel
                                value="1"
                                control={<Radio color="primary" />}
                                label="Hire For A Project"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="2"
                                control={<Radio color="primary" />}
                                label="Work As A Freelancer"
                            />
                        </RadioGroup>
                    </div>
                    <div className="registration__checkbox">
                        <div>
                            <p>
                                <Checkbox
                                    name="terms"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    checked={terms}
                                    onChange={e => setTerms(e.target.checked)}
                                />
                                Yes, I understand and agree to the Upwork Terms of Service.
                            </p>
                        </div>
                    </div>
                    <div className="registration__button">
                        <div>
                            <button className="registration__signInButton" onClick={registerUser}>Register</button>
                        </div>
                    </div>
                </div>
            </StyleRoot>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
            <Snackbar open={openSnackbar} autoHideDuration={3000000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Registration;