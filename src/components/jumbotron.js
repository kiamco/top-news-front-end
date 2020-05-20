import React,{useState} from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormControl,Input, InputLabel, FormHelperText, Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    container:{
        height:"425px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
    },
    header:{
        textAlign:"center"
    },
    form:{
        minWidth: "650px",
        display:'flex',
        flexFlow:"row wrap",
        alignItems:"center",
        justifyContent:"space-between",
                margin: "20px 0 0 0"

    },
    inputContainer:{
        minWidth: "500px",
    },
    inputEl:{
        minWidth:"inherit"
    },
    sumbmitButton:{
        margin:"0 0 0 20px"
    }
}));


const Jumbotron = () => {
    const classes = useStyles();
    return(
        <Box className={classes.container}>
            <Typography variant='h3' className={classes.header  }>Subscribe to get the latest news</Typography>
            <FormControl size="medium" required='true' className={classes.form}>
                <Box className={classes.inputContainer}>
                    <InputLabel className={classes.inputEl} htmlFor="my-input">Email address</InputLabel>
                    <Input className={classes.inputEl} id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText className={classes.inputEl} id="my-helper-text">We'll never share your email.</FormHelperText>
                </Box>
                <Button 
                size="large" 
                variant="contained" 
                className={classes.sumbmitButton}
                color="primary"
                type="submit">
                    Subscribe
                    </Button>
            </FormControl>

        </Box>
    )
    
}

export default Jumbotron;