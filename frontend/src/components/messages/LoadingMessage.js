import React from 'react';

import Box from '@material-ui/core/Box';

import ReactLoading from 'react-loading';

export default class Message extends React.Component {

    render() {

        var messageStyle = { 
            maxWidth: "55%", 
            minWidth: "2%", 
            height: "100%",
            float: "left", 
            paddingTop: "0.7%", 
            paddingBottom: "1%", 
            paddingLeft: "1.2%", 
            paddingRight: "1.2%", 
            background: "#E7E6E6", 
            color: "#000000",
        }

        return (
            <Box display="block" style={{width: "100%", float: this.alignment, height: "2.5%", padding: "0.1%"}}>
                <Box variant="outlined" borderRadius={10} style={messageStyle}>
                    <ReactLoading type={"bubbles"} color={"#000000"} height={10} width={30} />
                </Box>
            </Box>
        );
    }
}