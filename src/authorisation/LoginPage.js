import React from 'react';

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from '@material-ui/core';
import Box from "@material-ui/core/Box";

import LoginButton from "./LoginButton.js";
import SignUpButton from "./SignUpButton.js";

const LoginPage = () => {

	return (
		<Box height="93vh">
			<Grid container p={3}>
				<Grid item xs={3}></Grid>
				<Grid item xs={6}>
					<Box style={{ height: "20vh" }}></Box>
					<Paper style={{ height: "40vh", borderRadius: 16 }}>
						<Box p={2}>
							<Typography variant="h5" style={{ color: "#183052" }}><strong>Log into My Business</strong></Typography>
							<LoginButton />
							<SignUpButton />
						</Box>
					</Paper>
				</Grid>
				<Grid item xs={3}></Grid>
			</Grid>
		</Box>
	);
};

export default LoginPage;