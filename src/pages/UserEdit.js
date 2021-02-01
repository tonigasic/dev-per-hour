import React, {useEffect, useState} from "react";
import '../assets/css/UserEdit.css'
import TextField from "@material-ui/core/TextField";
import Radium, {StyleRoot} from "radium";
import {fadeIn} from "react-animations";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {InputAdornment} from "@material-ui/core";
import {useHistory} from "react-router-dom";

function UserEdit () {
    const user = useSelector(selectUser);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const history = useHistory();

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
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    return (
        <div className="userEdit">
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
                            <TextField label="Email" variant="outlined" size="small" value={email} onChange={e => setEmail(e.target.value)}/>
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
                            <button className="userEdit__saveButton" >Save</button>
                        </div>
                    </div>
                </div>
            </StyleRoot>
            <Snackbar open={openSnackbar} autoHideDuration={3000000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default UserEdit;