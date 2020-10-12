import React from 'react';

import Grid from "@material-ui/core/Grid";
import { Typography, makeStyles } from '@material-ui/core';
import Box from "@material-ui/core/Box";

import {
    BrowserView, MobileView
} from "react-device-detect";

import LoginButton from "./LoginButton.js";
import SignUpButton from "./SignUpButton.js";

const useStyles = makeStyles({
	leftBox: { 
		height: "20%", 
		paddingTop: "15%" 
	},
	rightBox: { 
		height: "20%", 
		paddingTop: "20%" 
	},
	typography: { 
		color: "#000000" 
	},
	outerBox: {
		height: "calc(100vh - 65px)"
	}
});

const LoginPage = () => {
	const classes = useStyles();

	return (
		<>
			<BrowserView>
				<Box className={classes.outerBox}>
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
			</BrowserView>
			<MobileView>
				<Box className={classes.outerBox}>

					<div style={{justifyContent: "center", display: "flex", marginTop: "40%"}}>
						<LoginButton />
					</div>
					<div style={{justifyContent: "center", display: "flex", marginTop: "10%"}}>
						<SignUpButton />
					</div>

				</Box>
			</MobileView>
		</>
	);
};

export default LoginPage;