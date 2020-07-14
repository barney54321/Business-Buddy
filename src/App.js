import React from 'react';

import MenuBar from "./MenuBar";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";

class App extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			loggedIn: true,
		}
	}

	render() {

		var internals = <></>;
		var name = "Pizza Planet";

		if (this.state.loggedIn) {
			internals = <Dashboard app={this}/>
			name = "Pizza Planet";
		} else {
			internals = <LoginPage app={this}/>
		}

		return (
			<>
				<MenuBar name={name}></MenuBar>

				{internals}
			</>
		);
	}
}

export default App;
