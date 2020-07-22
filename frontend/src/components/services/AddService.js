import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 230,
        background: "#FFFFFF"
    },
}));

const AddService = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        let name = document.getElementById("add_service_name").value;
        let url = document.getElementById("add_service_url").value;

        if (name !== "" && url !== "") {
            props.addService({
                name: name,
                link: url,
            });
        }
        handleClose();
    }

    return (

        <Grid item xs={6} style={{height: 250}}>
            <Box onClick={handleClickOpen} className={classes.paper} boxShadow={5} borderRadius={10} style={{ verticalAlign: "middle" }}>
                <AddIcon fontSize="large" style={{ marginTop: "45%" }} />
            </Box>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Service</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To manually add a service, please enter its name and url below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="add_service_name"
                        label="Service Name"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="add_service_url"
                        label="Service URL"
                        type="url"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleAdd} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default AddService;