import React, { useState } from 'react';
import './assets/css/Login.css';
import Logo from './assets/img/dev-per-hour-logo.png';
import { fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const styles = {
        fadeIn: {
            animation: 'x 2s',
            animationName: Radium.keyframes(fadeIn, 'fadeIn')
        },
    };

    return (
        <div className="login">
            <StyleRoot style={styles.fadeIn}>
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
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                        <button type="submit" className="login__signInButton">Sign in</button>
                        <button type="submit" className="login__demoSignInButton">Demo Sign in</button>
                    </form>
                    <p>
                        By signing-in you agree to the Dev-Per-Hour Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                    </p>
                    <button className="login__registerButton">Create your DPH Account</button>
                </div>
            </StyleRoot>
        </div>
    )
}

export default Login;