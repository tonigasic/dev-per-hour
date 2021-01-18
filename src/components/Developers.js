import React from 'react';
import '../assets/css/Developers.css';
import SearchIcon from '@material-ui/icons/Search';
import DeveloperCard from "./DeveloperCard";

function Developers() {
    return (
        <div className="developers">
            <div className="developers__container">
                <div className="developers__search">
                    <input className="developers__searchInput" type="text"/>
                    <SearchIcon className="developers__searchIcon" />
                </div>
                <div className="developers__list">
                    <DeveloperCard/>
                    <DeveloperCard/>
                    <DeveloperCard/>
                    <DeveloperCard/>
                    <DeveloperCard/>
                    <DeveloperCard/>
                    <DeveloperCard/>
                    <DeveloperCard/>
                    <DeveloperCard/>
                    <DeveloperCard/>
                </div>
            </div>
        </div>
    );
}

export default Developers;
