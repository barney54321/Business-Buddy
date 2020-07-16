import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import Message from "./Message";

export default class Buddy extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            currentMessage: "",
        }
    }

    clickSend = () => {

        if (this.state.currentMessage === "") {
            return;
        }

        var messages = this.state.messages;

        messages.push({
            text: this.state.currentMessage,
            align: "right",
            index: messages.length
        });

        this.setState({
            messages: messages,
            currentMessage: "",
        });
    }

    changeText = (e) => {
        this.setState({currentMessage: e.target.value});
    }

    forSubmit = (e) => {
        e.preventDefault();
        this.clickSend();
    }

    render() {

        var messageObjects = this.state.messages.map((obj) => <Message text={obj.text} align={obj.align} key={obj.index}/>);

        return (
            <>
                <Typography variant="h5" style={{ color: "#000000" }}>
                    <strong>My Buddy</strong>
                </Typography>
                <Paper elevation={3} style={{ height: "80vh" }}>

                    <Box style={{ height: "74.1vh" }}>
                        {messageObjects}
                    </Box>

                    <form noValidate autoComplete="off" onSubmit={this.forSubmit}>
                        <TextField id="outlined-basic" variant="outlined" size="small" value={this.state.currentMessage} onChange={this.changeText} style={{width: "90%"}}/>
                        <Button variant="contained" color="primary" style={{width: "7%", marginLeft: "1%"}} onClick={()=>this.clickSend()}>SEND</Button>
                    </form>

                </Paper>
            </>
        );
    }
}