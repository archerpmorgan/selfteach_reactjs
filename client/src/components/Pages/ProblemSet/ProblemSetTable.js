import React from 'react';
import { flipCompletedProblemsInProblemSet, flipCompletedProblemsInBookFromProblemSet } from "../../../common/DataFunctions.js";
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import * as api from '../../../api/index.tsx';

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {props.headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.05),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { bookTitle, numSelected, handleUpload, handleDelete, handleSoftUploadAndDelete, handleHardUploadAndDelete} = props;

  return (
    <Toolbar
      className={classes.root}
    >
      <Tooltip title="Delete Set">
        <IconButton className="fas fa-trash-alt" style={{ color: "blue" }} onClick={handleDelete}/>
      </Tooltip>
      <Tooltip title="Upload Completed and Delete Set">
        <IconButton className="far fa-arrow-alt-circle-up" style={{ color: "blue" }} onClick={handleSoftUploadAndDelete}/>
      </Tooltip>
      <Tooltip title="Upload All and Delete Set">
        <IconButton className="fas fa-arrow-alt-circle-up" style={{ color: "blue" }} onClick={handleHardUploadAndDelete}/>
      </Tooltip>
      {numSelected > 0 ? (
        <Typography className={classes.title} variant="subtitle1" component="div">
          {numSelected} selected -- saving will reverse each selected item
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {bookTitle}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Upload">
          <IconButton className="far fa-save" style={{ color: "blue" }} onClick={handleUpload}/>
        </Tooltip>
      ) : (
        <Tooltip title="Up To Date">
          <IconButton className="far fa-check-square" style={{ color: "green" }} onClick={() => { alert('Everything up to date!') }}/>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));


export default function ProblemSetTable(props) {
  const rows = props.rows
  const headCells = props.headCells;
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);


  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  // All completed problems will be set to completed in the database and the current problem set will be removed.
  const handleUpload = async () => {
    if (selected.length === 0) {
      return;
    }
    const newBookData = flipCompletedProblemsInProblemSet(props.allproblemsetdata, selected);
    const response = await api.updateProblemSet(props.allproblemsetdata);
    // Check response code 
    window.location.reload();
  }

  const handleDelete = async () => {
      const response = await api.deleteProblemSet(props.allproblemsetdata);
      console.log(response);
      window.location.reload();
  }

  // Dont just update the problem set but update the book data and delete the problem set
  const handleSoftUploadAndDelete = async () => {
    const newBookData = flipCompletedProblemsInBookFromProblemSet(props.allbookdata, props.allproblemsetdata, false);
    const postResponse = await api.flipBookProblems(newBookData);
    // Check response code 
    const deleteResponse = await api.deleteProblemSet(props.allproblemsetdata);
    window.location.reload();
  }
  // Dont just update the problem set but update the book data and delete the problem set
  const handleHardUploadAndDelete = async () => {
    const newBookData = flipCompletedProblemsInBookFromProblemSet(props.allbookdata, props.allproblemsetdata, true);
    const postResponse = await api.flipBookProblems(newBookData);
    // Check response code 
    const deleteResponse = await api.deleteProblemSet(props.allproblemsetdata);
    window.location.reload();
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const isCompleted = (row) => row.completed === "true";

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
        bookTitle={props.bookTitle}
        numSelected={selected.length}
        handleUpload={handleUpload}
        handleHardUploadAndDelete={handleHardUploadAndDelete}
        handleDelete={handleDelete}
        handleSoftUploadAndDelete={handleSoftUploadAndDelete}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead headCells={headCells}/>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  const isItemSelected = isSelected(row.sectionName + "-" + row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  let studiedStyle = {};
                  if (isCompleted(row)) {
                    studiedStyle = {
                      backgroundColor: "rgba(12, 245, 16, 0.1)"
                    }
                  } 
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.sectionName + "-" + row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      style={studiedStyle}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={row.id} scope="row" padding="none">{row.bookName} </TableCell>
                      <TableCell component="th" id={row.id} scope="row" padding="none">{row.sectionName} </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left" style={ isCompleted(row) ? {color: "green" } : {color: "red"}}>{row.completed}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}