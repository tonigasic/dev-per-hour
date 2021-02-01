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

function JobDescription() {
    const user = useSelector(selectUser);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        if (user && user.isLoggedIn) {
            setUserLoggedIn(true);
        }
    }, [user]);

    return (
        <div className="jobDescription__root">
            <div className="jobDescription">
                <div className="jobDescription__container">
                    <div className="jobDescription__title">
                        <h2>Dev-Per-Hour Web App development</h2>
                    </div>
                    <div className="jobDescription__details">
                        <div>
                            <div>
                                <div className="jobDescription__detailsWithIcon">
                                    <WatchLaterIcon style={{ fontSize: 15 }}/>
                                </div>
                                <div>
                                    <strong>10-30 hrs/week</strong>
                                    <p>Hours Needed</p>
                                </div>
                            </div>
                            <div>
                                <div className="jobDescription__detailsWithIcon">
                                    <DateRangeIcon style={{ fontSize: 15 }}/>
                                </div>
                                <div>
                                    <strong>Less than 6 Months</strong>
                                    <p>Duration</p>
                                </div>
                            </div>
                            <div>
                                <div className="jobDescription__detailsWithIcon">
                                    <EmojiObjectsIcon style={{ fontSize: 15 }}/>
                                </div>
                                <div>
                                    <strong>Expert</strong>
                                    <p>Experience Level</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="jobDescription__detailsWithIcon">
                                    <TimerIcon style={{ fontSize: 15 }}/>
                                </div>
                                <div>
                                    <strong>€10.00-€30.00</strong>
                                    <p>Hourly</p>
                                </div>
                            </div>
                            <div>
                                <div className="jobDescription__detailsWithIcon">
                                    <RoomIcon style={{ fontSize: 15 }}/>
                                </div>
                                <div>
                                    <strong>Remote Job</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="jobDescription__description">
                        <div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                            <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                    </div>
                    <div className="jobDescription__type">
                        <p><strong>Project Type:</strong>  One-time project</p>
                    </div>
                    <div className="jobDescription__skills">
                        <div>
                            <h2>Needed Skills</h2><br/>
                            <div className="jobDescription__skillChips">
                                <Chip label="Basic" />
                                <Chip label="Basic" />
                                <Chip label="Basic" />
                                <Chip label="Basic" />
                            </div>
                        </div>
                    </div>
                    <div className="jobDescription__button">
                        <div>
                            <Button disabled={!userLoggedIn} variant="contained">Apply for Job</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription;