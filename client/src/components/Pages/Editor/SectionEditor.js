import React from "react";
import { useSelector } from "react-redux";
import { extractSectionsForTable, selectBook} from "../../../common/DataFunctions.js";
import EnhancedTable from "./SectionEditorTable";


function SectionEditor(props) {

  const allbookdata = useSelector((state) => state.bookdata);
  const onebookdata = selectBook(allbookdata, props.bookname);
  const rows = extractSectionsForTable(onebookdata);

  return (
    <EnhancedTable bookTitle={props.bookname} rows={rows}></EnhancedTable>
  );
}

export default SectionEditor;
