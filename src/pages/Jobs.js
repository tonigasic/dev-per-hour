import React, {useEffect, useState} from "react";
import '../assets/css/Jobs.css';
import SearchIcon from "@material-ui/icons/Search";
import JobCard from "../components/JobCard";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";
import {getRequest} from "../Request";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import NoData from "../components/NoData";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const user = useSelector(selectUser);

    useEffect(()=> {
        new Promise((resolve, reject) => {
            let path = '/job';
            getRequest(path, resolve, reject);
        })
            .then((response) => {
                if (response.status === 200 && response.data && response.data.length > 0) {
                    setJobs(response.data);
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err);
                setOpenSnackbar(true);
            })
    }, []);

    const handleCloseSnackbar = (event, reason) => {
        setOpenSnackbar(false);
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    const isJobFavorite = (jobId) => {
        if (user && user.isLoggedIn && user.user && user.user.saved_jobs && Array.isArray(user.user.saved_jobs)) {
            let savedJobs = user.user.saved_jobs;
            if (savedJobs.includes(jobId)) {
                return true;
            }
        }
        else {
            return false;
        }
    };

    return (
        <div className="jobs">
            <div className="jobs__container">
                <div className="jobs__search">
                    <input className="jobs__searchInput" type="text"/>
                    <SearchIcon className="jobs__searchIcon" />
                </div>
                <div className="jobs__list">
                    { jobs ?
                        jobs.map((job, index) => {
                            return <JobCard
                                key={job._id}
                                id={job._id}
                                title={job.title}
                                description={job.description}
                                duration={job.duration}
                                duration_type={job.duration_type}
                                experience={job.experience}
                                hours_high={job.hours_high}
                                hours_low={job.hours_low}
                                price_high={job.price_high}
                                price_low={job.price_low}
                                skills={job.skills}
                                isFavorite={isJobFavorite(job._id)}
                            />
                        })
                        :
                        <NoData/>
                    }
                </div>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Jobs;