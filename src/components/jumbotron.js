import React,{useState} from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormControl,Input, InputLabel, FormHelperText, Button } from '@material-ui/core';
import Axios from 'axios';

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
    const [input, setInput] = useState({
        email:''
    });
    const changeHandler = (e) => {
        e.preventDefault();
        e.persist();
        setInput(prev => {
            return {...prev,[e.target.name]:e.target.value}
        });
        console.log(input);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const db = 'http://localhost:8000/subscribe'
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        Axios.post(db,input,config)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err)
        })

        console.log(e.target.value)

    }
    return(
        <Box className={classes.container}>
            <Typography variant='h3' className={classes.header}>Subscribe to get the latest news</Typography>
            <FormControl 
            size="medium" 
            required={true} 
            className={classes.form}
            >
                <Box className={classes.inputContainer}>
                    <InputLabel className={classes.inputEl} htmlFor="my-input">Email address</InputLabel>
                    <Input 
                    className={classes.inputEl} 
                    name='email' 
                    id="my-input" 
                    aria-describedby="my-helper-text"
                    onChange={changeHandler} />
                    <FormHelperText className={classes.inputEl} id="my-helper-text">We'll never share your email.</FormHelperText>
                </Box>
                <Button 
                size="large" 
                variant="contained" 
                className={classes.sumbmitButton}
                color="primary"
                type="submit"
                onClick={(e) => onSubmitHandler(e)}>
                    Subscribe
                    </Button>
            </FormControl>

        </Box>
    )
    
}

export default Jumbotron;