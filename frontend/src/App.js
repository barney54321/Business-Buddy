import React from 'react';
import axios from "axios";

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import MenuBar from "./components/MenuBar";
import LoginPage from "./components/authorisation/LoginPage";
import Dashboard from "./components/Dashboard";
import SettingsPage from "./components/SettingsPage";
import Alerts from './components/Alerts';

import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
	const { isAuthenticated, user, logout } = useAuth0();

	const [page, setPage] = React.useState("loading");
	const [business, setBusiness] = React.useState(null);
	const [alerts, setAlerts] = React.useState(null);

	React.useEffect(() => {
		if (!isAuthenticated) {
			return;
		}

		var url = "/api/users";

		let postData = {
			email: user.email,
			token: "",
		}

		axios.post(url, postData).then((x) => {
			setBusiness(x.data);
			setPage("dashboard");
		});

	}, [isAuthenticated, user]);

	const updateBusiness = (newBusiness) => {
		var url = "/api/update_user";

		let postData = {
			newBusiness: newBusiness,
			token: "",
		};

		axios.post(url, postData).then((x) => {
			setBusiness(x.data);
		}).catch(err => { });
	}

	const addService = (service) => {
		let newBusiness = { ...business };
		newBusiness.services.push(service);
		updateBusiness(newBusiness);
	};

	const deleteAccount = () => {
		var url = "/api/delete_user";

		let postData = {
			email: business.email,
			token: "",
		};

		axios.post(url, postData);

		logout({
			returnTo: window.location.origin,
		})
	}

	if (alerts == null) {
		let url = "/api/alerts";
		axios.get(url).then(res => {
			let resAlerts = res.data.alerts;
			setAlerts(resAlerts);
		});
	}

	return (
		<>
			<MenuBar user={user} business={business} setPage={(change) => setPage(change)}></MenuBar>

			<Backdrop open={isAuthenticated && page==="loading"}>
				<CircularProgress color="inherit" />
			</Backdrop>

			<div style={{ display: isAuthenticated && page === "dashboard" ? "block" : "none" }} >
				<Dashboard updateBusiness={updateBusiness} business={business} setPage={setPage} addService={addService} alerts={alerts} />
			</div>

			<div style={{ display: isAuthenticated && page === "alerts" ? "block" : "none" }} >
				<Alerts alerts={alerts} />
			</div>

			<div style={{ display: isAuthenticated && page === "settings" ? "block" : "none" }} >
				<SettingsPage updateBusiness={updateBusiness} business={business} user={user} deleteAccount={deleteAccount} />
			</div>

			<div style={{ display: !isAuthenticated ? "block" : "none" }} >
				<LoginPage />
			</div>
		</>
	);
};

export default App;
