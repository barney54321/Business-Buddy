import React from 'react';

import {
    BrowserView,
    MobileView,
} from "react-device-detect";

import BrowserDashboard from './BrowserDashboard';
import MobileDashboard from './MobileDashboard';

const Dashboard = (props) => {

    return (
        <>
            <BrowserView>
                <BrowserDashboard props={props}/>
            </BrowserView>
            <MobileView>
                <MobileDashboard props={props}/>
            </MobileView>
        </>
    );
}

export default Dashboard;