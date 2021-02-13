import React, {useEffect, useState} from 'react';
import '../assets/css/Jobs.css';
import SearchIcon from '@material-ui/icons/Search';
import {getRequest} from "../Request";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import NoData from "../components/NoData";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";
import JobCard from "../components/JobCard";
import UserJobCard from "../components/UserJobCard";

function UsersJobs() {
    const [jobs, setJobs] = useState([]);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const user = useSelector(selectUser);

    useEffect(()=> {
        loadJobs();
    }, []);

    const reloadSavedJobs = (id) => {
        let jobsClone = [...jobs];
        let index = jobsClone.findIndex(job => job._id === id);

        if (index !== -1) {
            jobsClone.splice(index, 1);
            setJobs(jobsClone);
        }
        loadJobs();
    };

    const loadJobs = () => {
        if (user && user.isLoggedIn && user.user) {
            new Promise((resolve, reject) => {
                let path = '/job/user/'+ user.user._id;
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
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        setOpenSnackbar(false);
    };

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    return (
        <div className="jobs">
            <div className="jobs__container">
                <div className="jobs__search">
                    <input className="jobs__searchInput" type="text"/>
                    <SearchIcon className="jobs__searchIcon" />
                </div>
                <div className="jobs__list">
                    { jobs && Array.isArray(jobs) && jobs.length > 0 ?
                        jobs.map((job, index) => {
                            return <UserJobCard
                                key={job._id}
                                id={job._id}
                                title={job.title}
                                reloadJobs={() => reloadSavedJobs(job._id)}
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
    );
}

export default UsersJobs;
