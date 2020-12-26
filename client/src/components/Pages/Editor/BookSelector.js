import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import calculus from "../../../images/calculus.jpeg";
import statistics from "../../../images/statistics.jpeg";
import ladr from "../../../images/ladr.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxListSecondary() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const images = {
    "calculus": calculus,
    "ladr": ladr,
    "statistics": statistics
  }

  return (
    <List dense className={classes.root}>
      {["calculus", "ladr", "statistics"].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem key={value} button>
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={images[value]}
                alt={"book cover photo"}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={value} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

