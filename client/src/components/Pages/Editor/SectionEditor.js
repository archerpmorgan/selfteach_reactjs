import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTable, useRowSelect, useRowState } from "react-table";
import {
  extractSectionsForTable,
  selectBook,
} from "../../../common/DataFunctions.js";
import { useSelector, useDispatch } from "react-redux";
import { storeSectionData } from "../../../actions/tablesectiondata";
import { storeSectionCheckedRows } from "../../../actions/sectioncheckedrows";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function deepcopy(object) {
  return(JSON.parse(JSON.stringify(object)));
}

function simpleObjectEquality(a, b) {
  let keyfound = false;
  let valuematches = false;
  for (const [akey, avalue] of Object.entries(a)) {
    for (const [bkey, bvalue] of Object.entries(b)) {
      if (akey === bkey) {
        keyfound = true;
        if (b[bkey] === a[akey]) {
          valuematches = true;
        }
      }
    }
    console.log(keyfound, valuematches);
    if (!(keyfound && valuematches)) {
      return false;
    }
    keyfound = false;
    valuematches = false;
  }
  return true;
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

function createInitialState(data) {
  if (Object.keys(data).length === 0) {
    return {};
  }
  let index = 0;
  let retval = {};
  data.forEach((section) => {
    if (section.haveStudied === "true") {
      retval[index.toString()] = true;
    }
    index++;
  });
  return retval;
}

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI

  let initialState = createInitialState(data);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        selectedRowIds: initialState,
      },
    },
    useRowSelect,
    useRowState,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => <div></div>,
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  // TODO
  // - use the function to toggle to selected based on whether or not studied is true
  // - use the onchange to change the redux state for the table if checked

  const dispatch = useDispatch();
  if (Object.keys(selectedRowIds).length != 0) {
      dispatch(storeSectionCheckedRows(JSON.parse(JSON.stringify(selectedRowIds))));
      dispatch(storeSectionData(data));
  }

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}

// send a deep clone of rowdata, not rowdata, for making this function easier

// function updateSectionState(selectedRowIds, rowdata, dispatch) {
//   let nochange = true;
//   for (const [key, value] of Object.entries(selectedRowIds)) {
//     if (rowdata[parseInt(key, 10)].haveStudied === "false") {
//       nochange = false;
//       rowdata[parseInt(key, 10)].haveStudied = "true"
//     }
//   }
//   if (Object.keys(selectedRowIds).length === 0 || nochange) {
//     console.log("not updating, no change");
//   } else {
//     console.log("should update, diff");
//     dispatch(storeSectionData(rowdata));
//   }
// }

function SectionEditor(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Studied?",
        accessor: "haveStudied", // accessor is the "key" in the data
      },
      {
        Header: "Studied Date",
        accessor: "studiedDate",
      },
    ],
    []
  );

  const allbookdata = deepcopy(useSelector((state) => state.bookdata));
  const onebookdata = selectBook(allbookdata, props.bookname);
  const sectionData = extractSectionsForTable(onebookdata);

  return (
    <Styles>
      <Table columns={deepcopy(columns)} data={deepcopy(sectionData)}/>
    </Styles>
  );
}

export default SectionEditor;
