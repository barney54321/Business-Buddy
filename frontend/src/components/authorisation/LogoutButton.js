import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MenuItem from "@material-ui/core/MenuItem";

const LogoutButton = () => {
	const { logout } = useAuth0();

	const handleClick = () => {
		logout({
			returnTo: window.location.origin,
		})
	};

	return (
		<MenuItem onClick={handleClick}>Log Out</MenuItem>
	);
};

export default LogoutButton;