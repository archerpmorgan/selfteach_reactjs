import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper, Button, TextareaAutosize } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import * as api from '../../../api/index.tsx';
// import axios from axios;


const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
}));

const NewBookToolbar = (props) => {
  const classes = useToolbarStyles();
  const { isInputWellFormatted, handleUpload, image } = props;

  return (
    <Toolbar className={classes.root}>
      {(isInputWellFormatted && image)?  (
        <Tooltip title="Upload">
          <IconButton
            className="far fa-save"
            style={{ color: "blue" }}
            onClick={handleUpload}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Input not well-formatted or no image chosen">
          <IconButton
            className="far fa-times-circle"
            style={{ color: "red" }}
            onClick={() => {
              alert("Input a well-formatted filled-out template into the textarea!");
            }}
          />
        </Tooltip>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  textinput: {
    width: "100%",
  },
}));

function checkIsInputWellFormatted(input) {
  const matchstr = /ingestion template\nname:[,\s\w]+\nsubject:[,\s\w]+\nauthor:[,\s\w]+\nedition:[,\s\w]+\nimageURL:[,\s\w]*\nsections\W\Wname->description->number of problems\W:[\w\W]+end\sof\schapters\s/g;
  return (input.match(matchstr) != null);
}

function buildObject(input) {
  let retval = {}
  let index = 0;
  let lines = input.split(/\r?\n/);
  console.log(lines);
  index++;
  let name = lines[index].split(/:[\s]*/)[1];
  retval.title = name;
  index++;
  let subject = lines[index].split(/:[\s]*/)[1];
  retval.subject = subject;
  index++;
  let author = lines[index].split(/:[\s]*/)[1];
  retval.author = author;
  index++;
  let edition = lines[index].split(/:[\s]*/)[1];
  retval.edition = edition;
  index++;
  let imageURL = lines[index].split(/:[\s]*/)[1];
  retval.imageURL = imageURL;
  index++;
  index++
  let sections = []
  while (!lines[index].includes("end of chapter")) {
    let [sectionName, description, num] = lines[index].split(/->/);
    num = parseInt(num);
    let problems = []
    for (let i = 0; i < num; i++) {
      problems.push({
        name: i.toString(),
        completedDate: "",
        completed: false
      });
    }
    sections.push({
      name: sectionName,
      haveStudied: false,
      studiedDate: "",
      description: description,
      problems: problems
    })
    index++;
  }
  retval.sections = sections;
  return retval
}

function NewBook() {
  const classes = useStyles();
  const [isInputWellFormatted, setIsInputWellFormatted] = useState(false);
  const [inputText, setInputText] = useState("");
  const [image, setImage] = useState(null);

  const fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  const handleUpload = async () => {
    let bookObj = buildObject(inputText);
    console.log(bookObj);
    const response = await api.postNewBook(bookObj);
    console.log(response);
    // Check response code 
    window.location.reload();
  };

  const handletextareachange = (event) => {
    console.log("text area change")
    setIsInputWellFormatted(checkIsInputWellFormatted(event.target.value));
    setInputText(event.target.value);
  }
  return (
    <Container>
      <h1>Suggest a New Book for the Public Library</h1>
      <h2>Upload a well-formatted template and a cover image and your submission will be reviewed by a service administrator</h2>
      <div className="App mt-4">
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <NewBookToolbar
              isInputWellFormatted={isInputWellFormatted}
              handleUpload={handleUpload}
              image={image}
            />
            <TextareaAutosize
              className={classes.textinput}
              rowsMin={5}
              aria-label="maximum height"
              onChange={handletextareachange}
            />
            <input type="file" onChange={fileSelectedHandler} />
            {image ?
              <img src={image} alt="preview image" /> :
              <></>
            }
          </Paper>
        </div>
      </div>
    </Container>
  );
}

export default NewBook;
