import React from 'react';

import Box from '@material-ui/core/Box';

export default class Message extends React.Component {

    constructor(props) {
        super(props);

        this.alignment = props.align;
        this.text = props.text;
        this.colour = props.colour;
        this.textColour = props.textColour
    }

    render() {

        var messageStyle = { 
            maxWidth: "55%", 
            minWidth: "2%", 
            float: this.alignment, 
            paddingTop: "0.7%", 
            paddingBottom: "0.7%", 
            paddingLeft: "1.2%", 
            paddingRight: "1.2%", 
            background: this.colour, 
            color: this.textColour,
        }

        return (
            <Box display="block" style={{width: "100%", float: this.alignment, padding: "0.1%"}}>
                <Box variant="outlined" borderRadius={10} style={messageStyle}>
                    {this.text}
                </Box>
            </Box>
        );
    }
}