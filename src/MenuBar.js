import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";

export default class MenuBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
        }
    }

    render() {
        return (
            <AppBar position="static" style={{ backgroundColor: "#FFFFFF", height: "7vh", width: "1", color: "#000000" }}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={4}>
                            <img
                                src="koala.jpg"
                                className="App-logo"
                                alt="logo"
                                padding="5"
                            />
                            <Typography variant="h3" style={{ display: "inline" }}>
                                <strong>Business Buddy</strong>
                            </Typography>
                        </Grid>

                        
                        <Grid item xs={4}>
                            <Button>HOME</Button>
                            <Button>PRIVACY</Button>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container>
                                <Grid item xs={10}>
                                    <Typography variant="h5" align="right">
                                        {this.state.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={1}>
                                    <Avatar alt="Cindy Baker" src="pizza.jpg" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

        );
    }
}