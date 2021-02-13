import React, {useState} from "react";
import './../assets/css/UserJobCard.css';
import {selectUser} from "../redux/User/reducer";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {IconButton, Modal} from "@material-ui/core";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {deleteRequest, postRequest} from "../Request";

function UserJobCard({id, title, reloadJobs}) {
    const user = useSelector(selectUser);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setOpenSuccessSnackbar(false);
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const deleteJob = () => {
        new Promise((resolve, reject) => {
            let path = '/job/' + id;
            deleteRequest(path, resolve, reject);
        })
            .then((response) => {
                if (response.status === 200 && response.data) {
                    reloadJobs();
                    setOpenSuccessSnackbar(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err);
                setOpenSnackbar(true);
            })
    }

    const modalBody = (
        <div style={getModalStyle()} className="jobCard__confirmModal">
            <h2>Delete Job</h2>
            <br/>
            <br/>
            <p>
                Are you sure you want to delete this job?
            </p>
            <br/>
            <br/>
            <div className="jobCard__deleteButtons">
                <button onClick={deleteJob}>Yes</button>
                <button onClick={handleClose}>No</button>
            </div>
        </div>
    );

    return (
        <div className="jobCard">
            <div className="jobCard__header">
                <div className="jobCard__title">
                    <h3>{title}</h3>
                </div>
                <div className="jobCard__favorite">
                    <IconButton onClick={e => history.push('/job/edit/' + id)}>
                        <CreateIcon/>
                    </IconButton>
                    <IconButton onClick={handleOpen}>
                        <DeleteForeverIcon/>
                    </IconButton>
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {modalBody}
            </Modal>
        </div>
    )
}

export default UserJobCard;