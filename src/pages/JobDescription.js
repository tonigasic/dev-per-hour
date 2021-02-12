import React, {useEffect, useState} from "react";
import '../assets/css/JobDescription.css';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TimerIcon from '@material-ui/icons/Timer';
import RoomIcon from '@material-ui/icons/Room';
import Chip from "@material-ui/core/Chip";
import {Button} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";
import {useParams} from "react-router-dom";
import {getRequest, putRequest} from "../Request";
import NoData from "../components/NoData";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LoadingOverlay from "react-loading-overlay";

function JobDescription() {
    const user = useSelector(selectUser);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [job, setJob] = useState({});
    const [renderJob, setRenderJob] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const [appliedFreelancers, setAppliedFreelancers] = useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (user && user.isLoggedIn) {
            setUserLoggedIn(true);
        }
    }, [user]);

    useEffect(()=> {
        new Promise((resolve, reject) => {
            let path = '/job/' + id;
            getRequest(path, resolve, reject);
        })
            .then((response) => {
                if (response.status === 200 && response.data) {
                    setJob(response.data);
                    setRenderJob(true);
                    setAppliedFreelancers(response.data.applied_freelancers);
                    let appliedUsers = response.data.applied_freelancers;
                    if (appliedUsers.includes(user.user._id)) {
                        setIsApplied(true);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err);
                setOpenSnackbar(true);
            })
    }, [id]);

    const handleCloseSnackbar = (event, reason) => {
        setOpenSnackbar(false);
        setOpenSuccessSnackbar(false);
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const cancelApplication = () => {
        setIsLoading(true);
        let appliedFreelancersClone = [...appliedFreelancers];

        let index = appliedFreelancersClone.findIndex(freelancer => freelancer === user.user._id);

        if (index !== -1) {
            appliedFreelancersClone.splice(index, 1);
            setAppliedFreelancers(appliedFreelancersClone);

        }
        let body = {
            applied_freelancers: appliedFreelancersClone,
        };

        new Promise((resolve, reject) => {
            let path = '/job/' + id;
            putRequest(path, body, resolve, reject);
        })
            .then((response) => {
                setIsLoading(false);
                setOpenSuccessSnackbar(true);
                if (response.status === 200 && response.data) {
                    setIsApplied(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                setIsApplied(false);
                setErrorMessage(err);
                setOpenSnackbar(true);
            })
    }

    const applyForJob = () => {
        setIsLoading(true);
        let appliedFreelancersClone = [...appliedFreelancers];
        appliedFreelancersClone.push(user.user._id);
        setAppliedFreelancers(appliedFreelancersClone);
        let body = {
            applied_freelancers: appliedFreelancersClone,
        };

        new Promise((resolve, reject) => {
            let path = '/job/' + id;
            putRequest(path, body, resolve, reject);
        })
            .then((response) => {
                setIsLoading(false);
                if (response.status === 200 && response.data) {
                    setIsApplied(true);
                    setOpenSuccessSnackbar(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                setIsApplied(false);
                setErrorMessage(err);
                setOpenSnackbar(true);
            })
    }

    return (
            <div className="jobDescription__root">
                <div className="jobDescription">
                    <LoadingOverlay
                        active={isLoading}
                        spinner
                        text='Loading your content...'
                    >
                    { renderJob ?
                        <div className="jobDescription__container">
                            <div className="jobDescription__title">
                                <h2>{job.title}</h2>
                            </div>
                            <div className="jobDescription__details">
                                <div>
                                    <div>
                                        <div className="jobDescription__detailsWithIcon">
                                            <WatchLaterIcon style={{ fontSize: 15 }}/>
                                        </div>
                                        <div>
                                            <strong>{job.hours_low}-{job.hours_high} hrs/week</strong>
                                            <p>Hours Needed</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="jobDescription__detailsWithIcon">
                                            <DateRangeIcon style={{ fontSize: 15 }}/>
                                        </div>
                                        <div>
                                            <strong>{job.duration + ' ' + job.duration_type + 's'}</strong>
                                            <p>Duration</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="jobDescription__detailsWithIcon">
                                            <EmojiObjectsIcon style={{ fontSize: 15 }}/>
                                        </div>
                                        <div>
                                            <strong>{job.experience}</strong>
                                            <p>Experience Level</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="jobDescription__detailsWithIcon">
                                            <TimerIcon style={{ fontSize: 15 }}/>
                                        </div>
                                        <div>
                                            <strong>€{job.price_low}-€{job.price_high}</strong>
                                            <p>Hourly</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="jobDescription__description">
                                <div>
                                    <h2>Job description</h2><br/>
                                    {job.description}
                                </div>
                            </div>
                            <div className="jobDescription__skills">
                                <div>
                                    <h2>Needed Skills</h2><br/>
                                    <div className="jobDescription__skillChips">
                                        { job.skills && job.skills.length > 0 ?
                                            job.skills.map((skill, index) => {
                                                return <Chip label={skill} key={index} />
                                            })
                                            :
                                            <Chip label="No Skills" />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="jobDescription__button">
                                <div>
                                    { isApplied ?
                                        <Button disabled={!userLoggedIn} variant="contained" onClick={cancelApplication}>Cancel application for Job</Button>
                                        :
                                        <Button disabled={!userLoggedIn} variant="contained" onClick={applyForJob}>Apply for Job</Button>
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <NoData/>
                    }

                    </LoadingOverlay>
                </div>
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                    <Alert onClose={handleCloseSnackbar} severity="error">
                        {errorMessage}
                    </Alert>
                </Snackbar>
                <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        Successfully {isApplied ? "applied to job" : "canceled application to job"}
                    </Alert>
                </Snackbar>
            </div>
    )
}

export default JobDescription;