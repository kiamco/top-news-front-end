import React,{useState} from 'react';
import {Box, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormControl,Input, InputLabel, FormHelperText, Button } from '@material-ui/core';
import Animation from '../assets/drawkit-grape-animation-6-NO-LOOP.json';
import Axios from 'axios';
import Lottie from 'lottie-react-web';


const useStyles = makeStyles(theme => ({
    container:{
        maxHeight:"100%",
        display:"flex",
        flexDirection:"row",
    },
    header:{
        textAlign:"center"
    },
    form:{
        display:'flex',
        flexFlow:"row wrap",
        alignItems:"center",
        justifyContent:"space-around",
                margin: "20px 0 0 0"

    },
    inputContainer:{
        // minWidth: "80%",
    },
    inputEl:{
        minWidth:"inherit"
    },
    sumbmitButton:{
        margin:"0 0 0 20px"
    },
    left:{
        minWidth: "50%",
        background:"whitesmoke",
        minHeight: "95vh"
    },
    right:{
        minWidth: "50%",
        background: "white",
        minHeight: "95vh",
        display:"flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent:"center"
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
    };

    return(
        <Box className={classes.container}>
            <Container className={classes.left}>
                <Lottie
                    options={{
                        animationData: Animation,
                        loop:false
                    }}
                />
            </Container>
            <Container className={classes.right}>
                <Typography variant='h4' className={classes.header}>Subscribe to get the latest news</Typography>
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
            </Container>

            

        </Box>
    )
    
}

export default Jumbotron;