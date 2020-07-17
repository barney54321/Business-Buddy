import React from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import Message from "./Message";

const initialMessages = [
    "Hi!",
    "I'm your Business Buddy 🐨",
    "I can help you manage your business.",
    "With me, you can keep track of services you are using, receive notifications tailored to your business needs, and find out information about health advice and business grants.",
    "To get started, I need a few basic bits of information about your business.",
    "All data is securely stored in Australia, and you can change or delete anything you want later on from the Settings tab at the top right.",
    "Where is your business based?",
]

export default class Buddy extends React.Component {

    constructor(props) {
        super(props);

        var messages = [];

        initialMessages.forEach(m => {
            messages.push({
                text: m,
                buddyMessage: true,
                align: "left",
                colour: "#E7E6E6",
                textColour: "#000000",
                index: messages.length
            });
        });

        this.state = {
            messages: messages,
            currentMessage: "",
            lastBudyMessage: initialMessages[initialMessages.length - 1],
        }
    }

    clickSend = () => {

        if (this.state.currentMessage === "") {
            return;
        }

        var messages = this.state.messages;

        messages.push({
            text: this.state.currentMessage,
            buddyMessage: false,
            align: "right",
            colour: "#4491FF",
            textColour: "#FFFFFF",
            index: messages.length
        });

        this.setState({
            messages: messages,
            currentMessage: "",
        });
    }

    changeText = (e) => {
        this.setState({ currentMessage: e.target.value });
    }

    forSubmit = (e) => {
        e.preventDefault();
        this.clickSend();
    }

    addBuddyMessage = (message) => {
        var messages = this.state.messages;

        messages.push({
            text: message,
            buddyMessage: true,
            align: "left",
            colour: "#E7E6E6",
            textColour: "#000000",
            index: messages.length
        });

        this.setState({
            messages: messages,
            lastBudyMessage: message,
        });
    }

    render() {

        var lastMessage = this.state.messages[this.state.messages.length - 1];

        if (!lastMessage.buddyMessage) {
            // Last message came from user
            if (this.state.lastBudyMessage === "Where is your business based?") {
                this.addBuddyMessage("What industry is your business a part of?");
            }

            if (this.state.lastBudyMessage === "What industry is your business a part of?") {
                this.addBuddyMessage("Awesome! Try asking me about what grants you might be eligible for, or what the current NSW Health regulations are for your business.");
            }
        }

        var messageObjects = this.state.messages.map((obj) => <Message text={obj.text} align={obj.align} key={obj.index} colour={obj.colour} textColour={obj.textColour} />);

        return (
            <>
                <Typography variant="h5" style={{ color: "#000000" }}>
                    <strong>My Buddy</strong>
                </Typography>
                <Box boxShadow={15} borderRadius={10} style={{ height: "80vh", padding: "2%" }}>

                    <Box style={{ height: "95%" }}>
                        {messageObjects}
                    </Box>

                    <form noValidate autoComplete="off" onSubmit={this.forSubmit}>
                        <TextField id="outlined-basic" variant="outlined" size="small" value={this.state.currentMessage} onChange={this.changeText} style={{ width: "90%" }} />
                        <Button variant="contained" color="primary" style={{ width: "7%", marginLeft: "1%" }} onClick={() => this.clickSend()}>SEND</Button>
                    </form>

                </Box>
            </>
        );
    }
}