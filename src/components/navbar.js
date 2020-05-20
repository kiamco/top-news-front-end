import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    tool:{
        display:"flex",
        justifyContent:"space-between"
    }
});


const Navbar = () => {
    const classes = useStyles();
    return(
        <AppBar position='static'>
            <Toolbar className={classes.tool}>
                <Typography variant='h6'>
                    Newnews
                </Typography>
                <Typography variant='h6'>
                    About
                </Typography>
            </Toolbar>
        </AppBar>
    )
    

}

export default Navbar;