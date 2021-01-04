import React from "react";
import { useSelector } from "react-redux";
import { extractProblemsForTable, selectBook} from "../../../common/DataFunctions.js";
import ProblemEditorTable from "./ProblemEditorTable";


function ProblemEditor(props) {

  const headCells = [
    { id: 0, field:'sectionName', numeric: false, disablePadding: true, label: 'Section Name' },
    { id: 1, field:'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 2, field:'completed', numeric: false, disablePadding: false, label: 'Completed?' },
  ];
  
  const allbookdata = useSelector((state) => state.bookdata);
  const onebookdata = selectBook(allbookdata, props.bookname);
  const rows = extractProblemsForTable(onebookdata);

  return (
    <ProblemEditorTable bookTitle={props.bookname} rows={rows} headCells={headCells}></ProblemEditorTable>
  );
}

export default ProblemEditor;