import React from 'react';
import '../assets/css/Footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className="footer__users">
                <strong>49,741,973</strong><br/>
                <small>Registered Users</small>
            </div>
            <div className="footer__jobs">
                <strong>19,222,226</strong><br/>
                <small>Total Jobs Posted</small>
            </div>
            <div className="footer__info">
                <strong>Dev-Per-Hour ® is a registered Trademark of DPH Technology Limited (ACN 123 959 476)</strong><br/>
                <small>Copyright © 2021 DPH Technology Limited (ACN 123 959 476)</small>
            </div>
        </div>
    );
}

export default Footer;
