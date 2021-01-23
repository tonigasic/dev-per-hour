import React from "react";
import '../assets/css/Jobs.css';
import SearchIcon from "@material-ui/icons/Search";
import JobCard from "../components/JobCard";

function Jobs() {
    return (
        <div className="jobs">
            <div className="jobs__container">
                <div className="jobs__search">
                    <input className="jobs__searchInput" type="text"/>
                    <SearchIcon className="jobs__searchIcon" />
                </div>
                <div className="jobs__list">
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                </div>
            </div>
        </div>
    )
}

export default Jobs;