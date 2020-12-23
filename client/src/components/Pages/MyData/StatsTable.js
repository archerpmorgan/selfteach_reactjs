import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, value) {
  return { name, value };
}

export default function StatsTable(props) {

  const rows = [
    createData('Problems Completed', `${props.summaryData.completedProblems}/${props.summaryData.totalProblems}\t\t` + Math.round(props.summaryData.completedProblems / props.summaryData.totalProblems * 100) / 100),
    createData('Sections Studied',`${props.summaryData.studiedSections}/${props.summaryData.totalSections}\t\t` + Math.round(props.summaryData.studiedSections / props.summaryData.totalSections))
  ];

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}