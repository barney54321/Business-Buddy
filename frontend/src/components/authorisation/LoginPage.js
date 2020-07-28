import React from 'react';

import Grid from "@material-ui/core/Grid";
import { Typography, makeStyles } from '@material-ui/core';
import Box from "@material-ui/core/Box";

import LoginButton from "./LoginButton.js";
import SignUpButton from "./SignUpButton.js";

const useStyles = makeStyles({
	leftBox: { 
		height: "20vh", 
		paddingTop: "15%" 
	},
	rightBox: { 
		height: "20vh", 
		paddingTop: "20%" 
	},
	typography: { 
		color: "#000000" 
	}
});

const LoginPage = () => {
	const classes = useStyles();

	return (
		<Box height="93vh">
			<Grid container p={3}>

				<Grid item xs={3}></Grid>

				<Grid item xs={3}>
					<Box className={classes.leftBox}></Box>

					<img
						src="koala.jpg"
						alt="Koala"
						height="20%"
					/>

				</Grid>

				<Grid item xs={3}>

					<Box className={classes.rightBox}></Box>

					<Typography variant="h5" className={classes.typography}>
						<strong>Log into Business Business</strong>
					</Typography>

					<br></br>
					<LoginButton />
					<br></br>
					<br></br>
					<SignUpButton />

				</Grid>

				<Grid item xs={3}></Grid>

			</Grid>
		</Box>
	);
};

export default LoginPage;