import React from "react";
import './../assets/css/JobCard.css';
import Chip from "@material-ui/core/Chip";
import ShowMoreText from 'react-show-more-text';
import {Link} from "react-router-dom";

function JobCard() {
    return (
        <Link to={'jobs/description'}>
            <div className="jobCard">
                <div className="jobCard__title">
                    <h3>Dev-Per-Hour Web App development</h3>
                </div>
                <br/>
                <div className="jobCard__price">
                    <h4>Hourly: €20-€30</h4>
                </div>
                <br/>
                <div className="jobCard__info">
                    <div>
                        <strong>10-30 hrs/week</strong>
                        <p>Hours Needed</p>
                    </div>
                    <div>
                        <strong>Less than 6 Months</strong>
                        <p>Duration</p>
                    </div>
                    <div>
                        <strong>Expert</strong>
                        <p>Experience Level</p>
                    </div>
                </div>
                <br/>
                <div className="jobCard__description">
                    <ShowMoreText
                        lines={2}
                        more='More'
                        less='Less'
                        anchorClass=''
                        expanded={false}
                    >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                        it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged.
                    </ShowMoreText>
                </div>
                <br/>
                <div className="jobCard__skills">
                    <Chip label="Basic" />
                    <Chip label="Basic" />
                    <Chip label="Basic" />
                    <Chip label="Basic" />
                </div>
            </div>
        </Link>
    )
}

export default JobCard;