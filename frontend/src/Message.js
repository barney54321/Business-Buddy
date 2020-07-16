import React from 'react';

import Paper from '@material-ui/core/Paper';

export default class Message extends React.Component {

    constructor(props) {
        super(props);

        this.alignment = props.align;
        this.text = props.text;
    }

    render() {
        return (
            <>
            <Paper variant="outlined" style={{ maxWidth: "75%", minWidth: "25%", float: this.alignment, padding: "0.5%" }}>
                {this.text}
            </Paper>
            <br></br>
            <br></br>
            </>
        );
    }
}