import React from "react";
import { useSelector } from "react-redux";
import { extractSectionsForTable, selectBook} from "../../../common/DataFunctions.js";
import EnhancedTable from "./SectionEditorTable";


function SectionEditor(props) {

  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'haveStudied', numeric: false, disablePadding: false, label: 'Studied?' },
    { id: 'studiedDate', numeric: false, disablePadding: false, label: 'Studied Date' },
  ];
  

  const allbookdata = useSelector((state) => state.bookdata);
  const onebookdata = selectBook(allbookdata, props.bookname);
  const rows = extractSectionsForTable(onebookdata);

  return (
    <EnhancedTable bookTitle={props.bookname} rows={rows} headCells={headCells}></EnhancedTable>
  );
}

export default SectionEditor;
