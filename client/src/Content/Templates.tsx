import React from "react";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));




export default function Templates() {
    let history = useHistory();
    const classes = useStyles();

    function handleClick() {
        history.push("/home");
    }
    return <div>
        Templates go here
        <Button
            onClick={handleClick}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
        >
            New
        </Button>
    </div>
}