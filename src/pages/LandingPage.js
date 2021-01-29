import React from 'react';
import '../assets/css/LandingPage.css';
import Image from '../assets/img/homepage-picture.png';
import WorkImage from '../assets/img/collage-work--desktop.jpg';
import CheckIcon from '@material-ui/icons/Check';
import {Button} from "@material-ui/core";
import { fadeIn , fadeInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import {Link} from "react-router-dom";
import CompanyImages from '../Companies';
import DevsImage from '../assets/img/svg/devs.svg';
import InvoiceImage from '../assets/img/svg/invoice.svg';
import JobsImage from '../assets/img/svg/jobs.svg';
import MessagesImage from '../assets/img/svg/messages.svg';

function LandingPage() {
    const styles = {
        fadeIn5: {
            animation: 'x 5s',
            animationName: Radium.keyframes(fadeIn, 'fadeIn')
        },
        fadeInUp: {
            animation: 'x 2s',
            animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
        }
    };

    return (
        <div className="landingPage">
            <StyleRoot>
                <div className="landingPage__heading" style={styles.fadeInUp}>
                    <div className="landingPage__text" style={styles.fadeIn5}>
                        <h1>In-demand talent on demand.</h1><br/>
                        <h2>Dev-Per-Hour is how!</h2><br/>
                        <h3>Find the best freelancers to deliver your projects.</h3>
                    </div>
                    <div className="landingPage__picture" style={styles.fadeIn5}>
                        <img
                            src={Image}
                            alt=""
                        />
                    </div>
                </div>
                <div className="landingPage__info" style={styles.fadeInUp}>
                    <div className="landingPage__infoText" style={styles.fadeIn5}>
                        <h1>Getting work done has never been easier</h1><br/>
                        <h2><CheckIcon/>Get matched with expert freelancers in minutes</h2><br/>
                        <h2><CheckIcon/>Dedicated 24/7 customer service team</h2><br/>
                        <h2><CheckIcon/>Money back guarantee and anti-fraud protection</h2>
                        <Link to={"/login"}>
                            <Button>Start Now For Free</Button>
                        </Link>
                    </div>
                    <div className="landingPage__infoPicture" style={styles.fadeIn5}>
                        <img
                            src={WorkImage}
                            alt=""
                        />
                    </div>
                </div>
                <div className="landingPage__trustedInfo" style={styles.fadeInUp}>
                    <div className="landingPage__trustedInfoMessage" style={styles.fadeIn5}>
                        <h2>Trusted by 1M+ businesses</h2>
                    </div>
                    <div className="landingPage__trustedInfoCompanies" style={styles.fadeIn5}>
                        { CompanyImages?.Images?.map((image, index) => {
                            return (
                                <div key={index}>
                                    <img src={image.src} alt=""/>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="landingPage__infoHowItWorks" style={styles.fadeInUp}>
                    <div style={styles.fadeIn5}>
                        <div>
                            <img
                                src={JobsImage}
                                alt=""
                            />
                            <br/>
                            <h3>Post a Job (it’s free)</h3>
                            <br/>
                            <p>Tell us about your project. Upwork connects you with top talent and agencies around the world, or near you.</p>
                        </div>
                        <div>
                            <img
                                src={DevsImage}
                                alt=""
                            />
                            <br/>
                            <h3>Hire a Developer</h3>
                            <br/>
                            <p>Get qualified proposals within 24 hours. Compare bids, reviews, and prior work. Interview favorites and hire the best fit.</p>
                        </div>
                        <div>
                            <img
                                src={MessagesImage}
                                alt=""
                            />
                            <br/>
                            <h3>Collaborate easily</h3>
                            <br/>
                            <p>Use Upwork to chat or video call, share files, and track project milestones from your desktop or mobile.</p>
                        </div>
                        <div>
                            <img
                                src={InvoiceImage}
                                alt=""
                            />
                            <br/>
                            <h3>Payment simplified</h3>
                            <br/>
                            <p>Pay hourly or fixed-price and receive invoices through Upwork. Pay for work you authorize.</p>
                        </div>
                    </div>
                </div>
            </StyleRoot>
        </div>
    );
}

export default LandingPage;
