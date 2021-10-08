import React, { useState } from "react";
import "../../../App.css";
import Tab from "./Tab";
import TabNav from "./TabNav";
import { Container } from "@material-ui/core";
import SectionEditor from "./SectionEditor";
import { getTitles } from "../../../common/DataFunctions.js";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import calculus from "../../../images/calculus.jpeg";
import statistics from "../../../images/statistics.jpeg";
import { useSelector } from "react-redux";
import ProblemEditor from "./ProblemEditor";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Editor() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(["Calculus Single and Multivariable"]);
  const [selectedTab, setSelectedTab] = useState("Sections");
  const allbookdata = useSelector((state) => state.bookdata);
  const bookTitles = getTitles(allbookdata);

  const handleToggle = (value) => () => {
    const newChecked = [];
    newChecked.push(value);
    setChecked(newChecked);
  };

  const images = allbookdata.resources.map((book) => {
    let title = book.title;
    let url = book.imageURL;
    return {
      title,
      url
    }
  });

  console.log(images)

  return (
    <Container>
      <h1>Edit Data</h1>
      <List dense className={classes.root}>
        {images.map((value) => {
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
      <div className="App mt-4">
        <TabNav
          tabs={["Sections", "Problems"]}
          selected={selectedTab}
          setSelected={setSelectedTab}
        >
          <Tab isSelected={selectedTab === "Sections"}>
            <SectionEditor bookname={checked[0]}></SectionEditor>
          </Tab>
          <Tab isSelected={selectedTab === "Problems"}>
            <ProblemEditor bookname={checked[0]}></ProblemEditor>
          </Tab>
        </TabNav>
      </div>
    </Container>
  );
}

export default Editor;
