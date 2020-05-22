import React, { useState } from 'react';
import { Box, Container, TextField, FormControlLabel, Portal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormControl, Input, InputLabel, FormHelperText, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Animation from '../assets/drawkit-grape-animation-6-NO-LOOP.json';
import Axios from 'axios';
import Lottie from 'lottie-react-web';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


const useStyles = makeStyles(theme => ({
    container: {
        maxHeight: "100%",
        display: "flex",
        flexDirection: "row",
    },
    header: {
        textAlign: "center",
        fontFamily: "'Bitter', serif",
        // margin: "20px 0 0 0"
    },
    form: {
        display: 'flex',
        flexFlow: "row wrap",
        alignItems: "center",
        justifyContent: "space-around",
        margin: "20px 0 0 0",
        width: "100%"

    },
    inputContainer: {
        minWidth: "100%"
    },
    inputEl: {
        minWidth: "inherit"
    },
    sumbmitButton: {
        minWidth: "100%",
        marginTop: "20px"
    },
    left: {
        minWidth: "50%",
        background: "whitesmoke",
        minHeight: "95vh"
    },
    right: {
        minWidth: "50%",
        background: "white",
        minHeight: "95vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center"
    },
    row1: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column"
    },
    checkbox: {
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "space-between",
        maxHeight: "200px",
        marginTop: "20px"
    }
}));

// business entertainment general health science sports technology
const Jumbotron = () => {
    const classes = useStyles();
    const [categories, setCategories] = useState({
        technology: false,
        sports: false,
        science: false,
        health: false,
        business: false,
        entertainment: false,
        general: false
    })
    const [input, setInput] = useState({
        email: ''
    });

    const postParser = () => {
        const categoryArr = Object.keys(categories).filter(category => {
            if(categories[category] === true){
                return category
            };
        });

        return {
            email: input,
            categories: categoryArr
        };
    };

    const changeHandler = (e) => {
        e.preventDefault();
        e.persist();
        setInput(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        });
        console.log(input);
    };

    const handleChange = (e) => {
        console.log(e.target.name)
        setCategories({ ...categories, [e.target.name]: e.target.checked });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        postParser();
        const db = 'http://localhost:8000/subscribe';
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        Axios.post(db, input, config)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <Box className={classes.container}>
            <Container className={classes.left}>
                <Lottie
                    options={{
                        animationData: Animation,
                        loop: false
                    }}
                />
            </Container>
            <Container className={classes.right}>
                <Typography
                    variant='h4'
                    className={classes.header}>
                    Subscribe For The Latest News
                    </Typography>
                <FormControl
                    size="medium"
                    required={true}
                    className={classes.form}
                >
                    <Box className={classes.row1} >
                        <Box className={classes.inputContainer}>
                            <InputLabel
                                className={classes.inputEl}
                                htmlFor="my-input">
                                Email address
                                 </InputLabel>
                            <Input
                                className={classes.inputEl}
                                name='email'
                                id="my-input"
                                aria-describedby="my-helper-text"
                                variant="outlined"
                                onChange={changeHandler} />

                            <FormHelperText className={classes.inputEl} id="my-helper-text">We'll never share your email.</FormHelperText>
                        </Box>
                        {/* business entertainment general health science sports technology */}
                        <Box className={classes.checkbox}>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={categories.tech}
                                    onChange={(e) => handleChange(e)}
                                    name="business" />
                            } label="Business" />
                            <FormControlLabel control={
                                <Checkbox
                                    checked={categories.entertainment}
                                    onChange={(e) => handleChange(e)}
                                    name="entertainment" />
                            } label="Entertainment" />
                            <FormControlLabel control={
                                <Checkbox
                                    checked={categories.general}
                                    onChange={(e) => handleChange(e)}
                                    name="general" />
                            } label="General" />
                            <FormControlLabel control={
                                <Checkbox
                                    checked={categories.health}
                                    onChange={(e) => handleChange(e)}
                                    name="health" />
                            } label="Health" />
                            <FormControlLabel control={
                                <Checkbox
                                    checked={categories.science}
                                    onChange={(e) => handleChange(e)}
                                    name="science" />
                            } label="Science" />
                            <FormControlLabel control={
                                <Checkbox
                                    checked={categories.sports}
                                    onChange={(e) => handleChange(e)}
                                    name="sports" />
                            } label="Sports" />
                            <FormControlLabel control={
                                <Checkbox
                                    checked={categories.technology}
                                    onChange={(e) => handleChange(e)}
                                    name="technology" />
                            } label="Technology" />

                        </Box>
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