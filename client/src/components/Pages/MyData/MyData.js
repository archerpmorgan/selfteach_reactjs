import React from 'react';
import '../../../App.css';
import BookDataOverview from './BookDataOverview';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


/**
 * 
 * Start with overview component
 * 
 * Then Have cards for each book
 * 
 * Data visualization components (possibly to be reused in overall and in each card):
 *  - total progress (chart)
 *  - total progress numerical/textual
 *  - .... 
 *   above is a good start
 * 
 *  Ideas:
 *    stacked area map https://www.material.io/design/communication/data-visualization.html#types
 */

function MyData() {

  const useStyles = makeStyles({
      heading: {
        fontSize: "50px", 
        margin: "2rem",
        fontFamily: "Palatino"
      },
  });

  const classes = useStyles();
    return (
      <div>
      <Typography className={classes.heading}>Personal Data Overview</Typography>
        <BookDataOverview/>
      </div>
    );
}

export default MyData;
