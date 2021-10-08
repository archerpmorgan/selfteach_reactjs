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
import * as api from '../../../api/index.tsx';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginLeft: 50
  }
}));


const headCells = [
  { id: 0, field:'bookName', numeric: false, disablePadding: true, label: 'Book Name' },
  { id: 1, field:'sectionName', numeric: false, disablePadding: true, label: 'Section Name' },
  { id: 2, field:'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 3, field:'completed', numeric: false, disablePadding: false, label: 'Completed?' },
];


function getNumProblemsRemaining(bookdata){
  let count = 0
  bookdata.forEach(book => {
    book.sections.forEach((section) => {
      section.problems.forEach((problem) => {
        if (section.haveStudied && !problem.completed) {
          count++;
        }
      })
    })
  });
  return count;
}

async function makeNewProblemSet(num, bookdata) {
    // create big list of possibles where the section has been studied and the problem is not already completed
    let possibles = []
    let set = [];
    bookdata.forEach(book => {
      book.sections.forEach((section) => {
        section.problems.forEach((problem) => {
          if (section.haveStudied && !problem.completed) {
            possibles.push({
              bookName: book.title,
              sectionName: section.name,
              name: problem.name,
              completed: "false"
            })
          }
        })
      })
    });
    // select randomly from this list
    const npr = getNumProblemsRemaining(bookdata);
    Math.floor(Math.random() * npr);
    for (let i = 0; i < num; i++) {
      let candidate = Math.floor(Math.random() * npr);
      while (set.includes(candidate)){
        candidate = Math.floor(Math.random() * npr);
      }
      set.push(candidate);
    }
    const retval = {
      problems: set.map(i => possibles[i])
    };
    const response = await api.postNewProblemSet(retval);
    // Check response code 
    window.location.reload();
    return retval;
}

function setAvailable(problemSetData){
  if (typeof problemSetData === "undefined"){
    return false;
  }
  if (Object.keys(problemSetData).length === 0){
    return false;
  }
  if (problemSetData.resources.length === 0){
    return false;
  }
  return true;
}

export default function CurrentProblemSet() {

  const handleNewProblemSet = () => {
    let newset = makeNewProblemSet(numRequested, JSON.parse(JSON.stringify(allbookdata.resources)));
  }

  const classes = useStyles();
  const [numRequested, setNumRequested] = useState(30);
  const allbookdata = useSelector((state) => state.bookdata);
  const allproblemsetdata = useSelector((state) => state.problemsetdata);


  const handleChange = (event) => {
    setNumRequested(event.target.value);
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
        <InputLabel htmlFor="age-native-simple">Number of Problems ({`${getNumProblemsRemaining(allbookdata.resources)} total remaining`})</InputLabel>
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
        <Button  onClick={handleNewProblemSet} className={classes.button} variant="contained" color="primary" disabled={setAvailable(allproblemsetdata)}>
          New
        </Button>
      </Paper>

      <div className="App mt-4">
        <ProblemSetEditor ></ProblemSetEditor>
      </div>
    </Container>
  );
}
