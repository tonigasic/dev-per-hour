import React, { useState } from 'react';
import '../assets/css/Login.css';
import Logo from '../assets/img/dev-per-hour-logo.png';
import { fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import {Link} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useDispatch} from "react-redux";
import {postRequest} from '../Request';
import { useHistory } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const styles = {
        fadeIn: {
            animation: 'x 2s',
            animationName: Radium.keyframes(fadeIn, 'fadeIn')
        },
    };

    const handleCloseSnackbar = (event, reason) => {
        setOpenSnackbar(false);
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const login = (e) => {
        e.preventDefault();
        if (validateRequest()) {
            new Promise((resolve, reject) => {
                let path = '/authenticate';
                let body = {
                    email: email,
                    password: password
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
                        history.push('/')
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setErrorMessage(err);
                    setOpenSnackbar(true);
                })
        }
    };

    const validateRequest = () => {
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
        return true;
    };

    return (
        <div className="login">
            <StyleRoot style={styles.fadeIn} className="login__div">
                <img
                    className="login__logo"
                    src={Logo}
                    alt=""
                />
                <div className="login__container">
                    <h1>Sign-in</h1>
                    <form>
                        <h5>E-Mail</h5>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                        <h5>Password</h5>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password"/>

                        <button className="login__signInButton" onClick={login}>Sign in</button>
                    </form>
                    <p>
                        By signing-in you agree to the Dev-Per-Hour Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                    </p>
                    <Link to={'/registration'}>
                        <button className="login__registerButton">Create your DPH Account</button>
                    </Link>
                </div>
            </StyleRoot>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Login;