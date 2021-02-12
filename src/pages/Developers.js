import React, {useEffect, useState} from 'react';
import '../assets/css/Developers.css';
import SearchIcon from '@material-ui/icons/Search';
import DeveloperCard from "../components/DeveloperCard";
import {getRequest} from "../Request";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import NoData from "../components/NoData";
import {useSelector} from "react-redux";
import {selectUser} from "../redux/User/reducer";

function Developers() {
    const [freelancers, setFreelancers] = useState([]);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const user = useSelector(selectUser);

    useEffect(()=> {
        new Promise((resolve, reject) => {
            let path = '/freelancer';
            getRequest(path, resolve, reject);
        })
            .then((response) => {
                if (response.status === 200 && response.data && response.data.length > 0) {
                    setFreelancers(response.data);
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

    const isFreelancerFavorite = (freelancerId) => {
        if (user && user.isLoggedIn && user.user && user.user.saved_developers && Array.isArray(user.user.saved_developers)) {
            let savedFreelancers = user.user.saved_developers;
            if (savedFreelancers.includes(freelancerId)) {
                return true;
            }
        }
        else {
            return false;
        }
    };

    return (
        <div className="developers">
            <div className="developers__container">
                <div className="developers__search">
                    <input className="developers__searchInput" type="text"/>
                    <SearchIcon className="developers__searchIcon" />
                </div>
                <div className="developers__list">
                    { freelancers ?
                        freelancers.map((freelancer, index) => {
                            return <DeveloperCard
                                key={freelancer._id}
                                id={freelancer._id}
                                name={freelancer.name}
                                profession={freelancer.profession}
                                city={freelancer.address.city}
                                countryCode={freelancer.address.countryCode}
                                skills={freelancer.skills}
                                picture={freelancer.picture}
                                price={freelancer.price}
                                isFavorite={isFreelancerFavorite(freelancer._id)}
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

export default Developers;
