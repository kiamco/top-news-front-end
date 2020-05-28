import React, { useState } from 'react';
import { Box, Container, TextField, FormControlLabel, Portal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormControl, Input, InputLabel, FormHelperText, Button } from '@material-ui/core';
import Animation from '../assets/drawkit-grape-animation-6-NO-LOOP.json';
import Axios from 'axios';
import Lottie from 'lottie-react-web';
import Checkbox from '@material-ui/core/Checkbox';

const lbBackend = 'http://35.202.144.83/';
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
        minHeight: "100vh"
    },
    right: {
        minWidth: "50%",
        background: "white",
        minHeight: "100vh",
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
        marginTop: "10px"
    },
    header2: {
        fontFamily: "'Bitter', serif",
        margin: "20px 0 0 0"
    },
    errMesg: {
        color: "red"
    }
}));

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

    const [postStatus, setPostStatus] = useState(false);

    const postParser = () => {
        const categoryArr = Object.keys(categories)
            .filter(category => {
                if (categories[category] === true) {
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
    };

    const handleChange = (e) => {
        setCategories({
            ...categories,
            [e.target.name]: e.target.checked
        }
        );
    };

    const addMailChimpContact = (email) => {
        const url = "https://us18.api.mailchimp.com/3.0/lists/4d90276477/members";

        let postBody = {
            email: email,
            status: "subscribed"
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `apiKey ${process.env.MAIL_CHIMP_API}`
            }
        };

        const success = false;

        Axios.post(url, JSON.stringify(postBody), config)
            .then(res => {
                console.log({
                    message: "successfully subscrbed"
                });
                success = true;
            })
            .catch(err => {
                console.log({
                    message: "error",
                    error: err
                });
            });

        return success;
    };

    const addToDb = (input) => {
        const db = 'http://localhost:8000/subscribe';

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        Axios.post(db, input, config)
            .then(res => {
                console.log(res);
                setPostStatus(true);
            })
            .catch(err => {
                console.log(err)
            });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const parsedJsonBody = postParser(); //formated user input
        // const isAddedToMailChimp = addMailChimpContact(input.email);
        Axios.post()
        //make sure that email is added to mail chim contact list
        // if (isAddedToMailChimp) {
        //     addToDb(parsedJsonBody);
        // };
    };

    const emailValidate = (emailStr) => {
        const regex = new RegExp(`^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$`);
        if (emailStr === '') {
            return false;
        };
        return !regex.test(emailStr);
    }

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
                <form className={classes.form} onSubmit={onSubmitHandler}>
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
                                onChange={changeHandler}
                                placeholder="youremail@gmail.com"
                                error={emailValidate(input.email)}
                                required
                            />

                            {
                                // check if email is in valid format
                                !emailValidate(input.email)
                                    ?
                                    <FormHelperText className={classes.inputEl} id="my-helper-text">We'll never share your email.</FormHelperText>
                                    :
                                    <FormHelperText className={`${classes.inputEl} ${classes.errMesg}`} id="my-helper-text">Invalid email format</FormHelperText>

                            }
                        </Box>
                        {/* business entertainment general health science sports technology */}
                        <Typography className={classes.header2}>News Category:</Typography>

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
                </form>
            </Container>
        </Box>
    )

}

export default Jumbotron;