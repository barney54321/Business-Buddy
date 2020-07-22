import React from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import Message from "./Message";
import LoadingMessage from "./LoadingMessage";

import axios from "axios";

export default class Buddy extends React.Component {

    constructor(props) {
        super(props);

        var messages = [];

        this.state = {
            messages: messages,
            currentMessage: "",
            lastBudyMessage: null,
            sessionId: null,
            firstMessage: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.business === null) {
            return;
        }

        var newAlerts = 0;
        var d = new Date();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        if (this.props.alerts[0].day !== "-1") {
            for (var i = 0; i < this.props.alerts.length; i++) {
                var alert = this.props.alerts[i];

                if (alert.day === d.getDate().toString() && alert.month === months[d.getMonth()]) {
                    newAlerts++;
                }
            }
        }

        if (prevProps === this.props || this.state.firstMessage) {
            return;
        }

        var business = this.props.business;

        let url = "/api/session";
        axios.get(url).then((x) => {

            if (this.state.firstMessage) {
                return;
            }

            this.setState({ sessionId: x.data.result.session_id });

            // Start conversation
            let url = "/api/message";

            this.setState({firstMessage: true});

            if (business.name === undefined || business.name === null) {
                // Tell Assistant to go through initiation and opening questions
                let postData = {
                    sessionId: this.state.sessionId,
                    text: "yes",
                }
    
                axios.post(url, postData).then((res) => {
                    let responses = res.data.output.generic;
                    for (var i = 0; i < responses.length; i++) {
                        this.addBuddyMessage(responses[i].text);
                    }
                });
            } else {
                // Answer opening questions for Assistant using information from database
                let postData = {
                    sessionId: this.state.sessionId,
                    text: "no",
                }
    
                axios.post(url, postData).then((a) => {
                    postData.text = business.postcode + ", " + business.employee_count + ", " + business.financial_help + ", " + business.fall_in_turnover + ", " + newAlerts.toString();
                    axios.post(url, postData).then((b) => {
                        postData.text = business.industry;
                        axios.post(url, postData).then((c) => {
                            postData.text = business.name;
                            axios.post(url, postData).then((res) => {
                                let responses = res.data.output.generic;
                                for (var i = 0; i < responses.length; i++) {
                                    this.addBuddyMessage(responses[i].text);
                                }
                            })
                        })
                    })
                });
            }
        });
    } 

    // Adds a message from the Assistant
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

    // Called when user clicks send or presses enter
    clickSend = () => {

        if (this.state.currentMessage === "") {
            return;
        }

        if (this.state.lastBudyMessage === "What is the name of your business?") {
            // Set business name
            let newBusiness = {...this.props.business};
            newBusiness.name = this.state.currentMessage;
            this.props.updateBusiness(newBusiness);
        }

        if (this.state.lastBudyMessage === "Please enter the postcode your business is based in (e.g. 2000)") {
            // Set business postcode
            let newBusiness = {...this.props.business};
            newBusiness.postcode = this.state.currentMessage;
            this.props.updateBusiness(newBusiness);
        }

        if (this.state.lastBudyMessage === "Please enter the industry your business is in (e.g. taxi, retail, restaurant)") {
            // Set business industry
            let newBusiness = {...this.props.business};
            newBusiness.industry = this.state.currentMessage;
            this.props.updateBusiness(newBusiness);
        }

        if (this.state.lastBudyMessage === "Please enter the number of employees your business has (e.g. 20)") {
            // Set business employee count
            let newBusiness = {...this.props.business};
            newBusiness.employee_count = this.state.currentMessage;
            this.props.updateBusiness(newBusiness);
        }

        if (this.state.lastBudyMessage === "Please specify whether you are receiving other government financial help (yes/no)") {
            // Set business government assistance
            let newBusiness = {...this.props.business};
            newBusiness.financial_help = this.state.currentMessage;
            this.props.updateBusiness(newBusiness);
        }

        if (this.state.lastBudyMessage === "Please enter your fall in turnover between March to July 2020 compared to an equivalent period as a percentage (e.g. 25)") {
            // Set business fall in turnover
            let newBusiness = {...this.props.business};
            newBusiness.fall_in_turnover = this.state.currentMessage;
            this.props.updateBusiness(newBusiness);
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

        let message = this.state.currentMessage;

        this.setState({
            messages: messages,
            currentMessage: "",
        });

        let url = "/api/message";

        let postData = {
            sessionId: this.state.sessionId,
            text: message,
        }

        axios.post(url, postData).then((res) => {
            let responses = res.data.output.generic;
            for (var i = 0; i < responses.length; i++) {
                this.addBuddyMessage(responses[i].text);
            }
        });
    }

    changeText = (e) => {
        this.setState({ currentMessage: e.target.value });
    }

    forSubmit = (e) => {
        e.preventDefault();
        this.clickSend();
    }

    render() {

        // Funny things are to ensure view is scrolled to bottom on update
        var messageObjects = this.state.messages.slice().reverse().map((obj) => <Message text={obj.text} align={obj.align} key={obj.index} colour={obj.colour} textColour={obj.textColour} />);


        var loadingMessage = <></>;
        if (this.state.messages.length === 0 || this.state.messages[this.state.messages.length - 1].buddyMessage === false) {
            loadingMessage = <LoadingMessage/>
        }

        return (
            <>
                <Typography variant="h5" style={{ color: "#000000", paddingBottom: "2%", paddingLeft: "2%" }}>
                    <strong>My Buddy</strong>
                </Typography>
                <Box boxShadow={5} borderRadius={10} style={{ height: "80vh", padding: "2%" }}>

                    <Box id="messageBody" style={{ height: "93%", overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column-reverse", paddingBottom: "2%" }}> 
                        {loadingMessage}
                        {messageObjects}
                    </Box>

                    <form noValidate autoComplete="off" onSubmit={this.forSubmit}>
                        <TextField id="outlined-basic" variant="outlined" size="small" value={this.state.currentMessage} onChange={this.changeText} style={{ width: "93.5%" }} />
                        <img
                            src="send.jpg"
                            alt="SEND"
                            width="5%"
                            onClick={() => this.clickSend()}
                            style={{ paddingLeft: "1%" }}
                        />
                    </form>

                </Box>
            </>
        );
    }
}