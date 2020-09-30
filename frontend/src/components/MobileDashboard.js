import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Services from "./services/Services";
import Buddy from "./messages/Buddy";

const MobileDashboard = (props) => {
    props = props.props;

    const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

    return (
		<>
			<AppBar position="static" style={{height: "6vh"}}>
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth" style={{height: "6vh"}}>
					<Tab label="My Buddy" style={{height: "6vh"}}/>
					<Tab label="My Services" style={{height: "6vh"}}/>
				</Tabs>
			</AppBar>

			<div style={{ display: value === 0 ? "block" : "none" }}>
				<Buddy
					business={props.business}
					addService={props.addService}
					updateBusiness={props.updateBusiness}
					alerts={props.alerts}
				/>
			</div>

			<div style={{ display: value === 1 ? "block" : "none" }}>
			    <Services
                    setPage={props.setPage}
                    addService={props.addService}
                    business={props.business}
                />
			</div>
		</>
    );
}

export default MobileDashboard;