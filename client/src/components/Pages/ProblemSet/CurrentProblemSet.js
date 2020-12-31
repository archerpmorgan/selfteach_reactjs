import React, { useState } from "react";
import "../../../App.css";
import { Container, Paper, Button } from "@material-ui/core";
import { getTitles } from "../../../common/DataFunctions.js";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import calculus from "../../../images/calculus.jpeg";
import statistics from "../../../images/statistics.jpeg";
import { useSelector } from "react-redux";
import ProblemSetEditor from "./ProblemSetEditor";



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginLeft: 50
  }
}));


export default function CurrentProblemSet() {
  const classes = useStyles();
  const [numRequested, setNumRequested] = useState(30);
  const [isAnySet, setIsAnySet] = useState(false)
  const allbookdata = useSelector((state) => state.bookdata);
  const allproblemsetdata = useSelector((state) => state.problemsetdata);
  const bookTitles = getTitles(allbookdata);
 

  const handleChange = (event) => {
    console.log(event);
  };
  const images = {
    "Calculus Single and Multivariable": calculus,
    "An Introduction to Mathematical Statistics and Its Applications": statistics,
  };

  return (
    <Container>
      <h1>Problem Set</h1>

      <Paper>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Number of Problems</InputLabel>
        <Select
          native
          value={numRequested}
          onChange={handleChange}
        >
          <option aria-label="None" value="" />
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </Select>
        </FormControl>
        <Button className={classes.button} variant="contained" color="primary" disabled={isAnySet}>
          New
        </Button>
      </Paper>

      <div className="App mt-4">
        <ProblemSetEditor ></ProblemSetEditor>
      </div>
    </Container>
  );
}
