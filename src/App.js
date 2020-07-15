import React from 'react';

import MenuBar from "./MenuBar";
import LoginPage from "./authorisation/LoginPage";
import Dashboard from "./Dashboard";

import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
	const { isAuthenticated } = useAuth0();

	var internals = <></>;

	if (isAuthenticated) {
		internals = <Dashboard app={this} />
	} else {
		internals = <LoginPage app={this} />
	}

	return (
		<>
			<MenuBar name="Pizza Planet" isAuthenticated={isAuthenticated}></MenuBar>

			{internals}
		</>
	);
};

export default App;
