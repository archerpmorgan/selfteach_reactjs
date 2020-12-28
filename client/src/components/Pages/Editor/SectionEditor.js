import React, { useState } from "react";
import styled from "styled-components";
import { useTable, useRowSelect, useRowState, useMemo } from "react-table";
import { extractSectionsForTable, selectBook } from "../../../common/DataFunctions.js";
import { useSelector } from "react-redux";



// let globalfuncsetrowstate =null;

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

// function onRowToggle(row){
//   console.log(globalfuncsetrowstate);
//   console.log("hi");
// }

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    // rest.onChange = onRowToggle;
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

function Table({ columns, data, updateMyData, skipPageReset }) {
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
    setRowState,
  } = useTable(
    {
      columns,
      data,
      updateMyData,
      initialState: {
        selectedRowIds: initialState,
      },
      useControlledState: (state) => {
        // update state in redux store
        console.log(state);
        return React.useMemo(
          () => ({
            ...state,
          }),
          [state]
        );
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

  console.log(props.bookname);

  const allbookdata = useSelector((state) => state.bookdata);
  console.log(allbookdata);

  // if (Object.keys(allbookdata).length === 0) {
  //   return (<></>);
  // }

  const onebookdata = selectBook(allbookdata, props.bookname);
  const [data, setData] = React.useState(() => extractSectionsForTable(onebookdata));
  const [originalData] = React.useState(data)
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  // // We need to keep the table from resetting the pageIndex when we
  // // Update data. So we can keep track of that flag with a ref.

  // // When our cell renderer calls updateMyData, we'll use
  // // the rowIndex, columnId and new value to update the
  // // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
      setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  console.log(data);
  return (
    <Styles>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </Styles>
  );
}

export default SectionEditor;
