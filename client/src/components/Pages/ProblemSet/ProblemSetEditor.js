import React from "react";
import { useSelector } from "react-redux";
import { extractProblemsForTable, selectBook} from "../../../common/DataFunctions.js";
import ProblemSetTable from "./ProblemSetTable";


function ProblemEditor(props) {

  const headCells = [
    { id: 0, field:'bookName', numeric: false, disablePadding: true, label: 'Book Name' },
    { id: 1, field:'sectionName', numeric: false, disablePadding: true, label: 'Section Name' },
    { id: 2, field:'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 3, field:'completed', numeric: false, disablePadding: false, label: 'Completed?' },
  ];
  
  const allbookdata = useSelector((state) => state.bookdata);
  const onebookdata = selectBook(allbookdata, props.bookname);
  const rows = extractProblemsForTable(onebookdata);

  return (
    <ProblemSetTable rows={rows} headCells={headCells}></ProblemSetTable>
  );
}

export default ProblemEditor;