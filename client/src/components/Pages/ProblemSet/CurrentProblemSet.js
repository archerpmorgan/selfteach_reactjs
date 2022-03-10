import React, { useState } from "react";
import "../../../App.css";
import { Container, Paper, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import calculus from "../../../images/calculus.jpeg";
import statistics from "../../../images/statistics.jpeg";
import { useSelector } from "react-redux";
import ProblemSetEditor from "./ProblemSetEditor";
import * as api from '../../../api/index.tsx';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";



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

async function makeNewProblemSet(num, bookdata, checked) {
    console.log(checked)
    // create big list of possibles where the section has been studied and the problem is not already completed
    let possibles = [];
    let set = [];
    bookdata.forEach(book => {
        if (checked.indexOf(book.title) !== -1) {
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
        }
      }
    );
    // select randomly from this list
    if (num > possibles.length) {
      return {}
    }
    for (let i = 0; i < num; i++) {
      let candidate = Math.floor(Math.random() * possibles.length);
      while (set.includes(candidate)){
        candidate = Math.floor(Math.random() * possibles.length);
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

  const [checked, setChecked] = React.useState([
    "Calculus Single and Multivariable",
    "Introduction To Computer Networking A Top-Down Approach",
    "Linear Algebra Done Right",
    "An Introduction to Mathematical Statistics and Its Applications"
  ]);

  const handleNewProblemSet = () => {
    let newset = makeNewProblemSet(numRequested, JSON.parse(JSON.stringify(allbookdata.resources)), checked);
  }

  const classes = useStyles();
  const [numRequested, setNumRequested] = useState(30);
  const allbookdata = useSelector((state) => state.bookdata);
  const allproblemsetdata = useSelector((state) => state.problemsetdata);

  const handleChange = (event) => {
    setNumRequested(event.target.value);
  };

  const handleToggle = (value) => () => {
    if (checked.indexOf(value) == -1) {
      const newChecked = [];
      checked.forEach(element => {
          newChecked.push(element);
      });
      newChecked.push(value);
      setChecked(newChecked);      
    }
    else {
      const newChecked = [];
      checked.forEach(element => {
        if (element != value) {
          newChecked.push(element);
        }
      });
      setChecked(newChecked);
    }
  };

  const imagesForSelector = allbookdata.resources.map((book) => {
    let title = book.title;
    let url = book.imageURL;
    return {
      title,
      url
    }
  });


  return (
    <Container>
      <h1>Problem Set</h1>

      <Paper>
        <h3>Scope to particular books</h3>
        <List dense className={classes.root}>
          {imagesForSelector.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value.title}`;
            return (
              <ListItem key={value.title} button>
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={value.url}
                    alt={"book cover photo"}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={value.title} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value.title)}
                    checked={checked.indexOf(value.title) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
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
