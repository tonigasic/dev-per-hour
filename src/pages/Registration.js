import React from "react";
import './../assets/css/Registration.css';
import Logo from '../assets/img/dev-per-hour-logo-small.png';
import Radium, {StyleRoot} from "radium";
import {fadeIn} from "react-animations";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import {CheckBox} from "@material-ui/icons";

function Registration() {
    const styles = {
        fadeIn: {
            animation: 'x 2s',
            animationName: Radium.keyframes(fadeIn, 'fadeIn')
        },
    };

    return (
        <div className="registration">
            <StyleRoot style={styles.fadeIn}>
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
                            <TextField label="Email" variant="outlined" size="small" />
                        </div>
                        <div className="registration__inputsPassword">
                            <TextField label="Password" variant="outlined" size="small" type="password" autoComplete="new-password" />
                        </div>
                        <div className="registration__inputsNameSurname">
                            <TextField label="First Name" variant="outlined" size="small" />
                            <TextField label="Last Name" variant="outlined" size="small" />
                        </div>
                    </div>
                    <div className="registration__radioButtons">
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            <FormControlLabel
                                value="Company"
                                control={<Radio color="primary" />}
                                label="Hire For A Project"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="Freelancer"
                                control={<Radio color="primary" />}
                                label="Work As A Freelancer"
                            />
                        </RadioGroup>
                    </div>
                    <div className="registration__checkbox">
                        <div>
                            <p>
                                <CheckBox
                                    name="checkedB"
                                    color="primary"
                                />
                                Yes, I understand and agree to the Upwork Terms of Service.
                            </p>
                        </div>
                    </div>
                    <div className="registration__button">
                        <div>
                            <button className="registration__signInButton">Register</button>
                        </div>
                    </div>
                </div>
            </StyleRoot>
        </div>
    )
}

export default Registration;