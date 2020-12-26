import React, { useState } from "react";
import "../../../App.css";
import Tab from "./Tab";
import TabNav from "./TabNav";
import BookSelector from "./BookSelector";
import PropTypes from "prop-types";

// export class GenericCustomTable extends React.Component {
//   constructor(props) {
//     this.state = {
//       currentTableData: Object.assign([], this.props.data),
//       columnsToDisplay: Object.assign([], this.props.columns),
//     };
//     this.renderHeaders = this.renderHeaders.bind(this);
//     this.renderRows = this.renderRows.bind(this);
//     this.renderIndividualRow = this.renderIndividualRow.bind(this);
//   }

//   renderHeaders() {
//     return this.state.columnsToDisplay.map((item, index) => {
//       const headerCssClassName = `col-md-${item.columnSize}`;
//       if (item.visible) {
//         return (
//           <div className={headerCssClassName} key={index}>
//             <span className="table-column-header-text">{item.displayText}</span>
//           </div>
//         );
//       } else {
//         return (
//           <div className={headerCssClassName} key={index} hidden>
//             <span className="table-column-header-text">{item.displayText}</span>
//           </div>
//         );
//       }
//     });
//   }

//   renderIndividualRow(data, dataKeys) {
//     return dataKeys.map((item, index) => {
//       let columnWidth = `col-md-${this.state.columnsToDisplay[index].columnSize}`;
//       if (item.visible) {
//         return (
//           <div className={columnWidth} key={index}>
//             {data[item.fieldName]}
//           </div>
//         );
//       } else {
//         return null;
//       }
//     });
//   }

//   renderRows() {
//     let dataKeys = Object.assign([], this.state.columnsToDisplay);
//     let dataRows = Object.assign([], this.state.currentTableData);
//     if (dataRows.length > 0) {
//       return dataRows.map((row, index) => {
//         return (
//           <div key={index} className="row">
//             {this.renderIndividualRow(row, dataKeys)}
//           </div>
//         );
//       });
//     }
//   }

//   render() {
//     return (
//       <div className="col-md-12">
//         <div className="row column-header-row">{this.renderHeaders()}</div>
//         {this.renderRows()}
//       </div>
//     );
//   }
// }

// GenericCustomTable.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
//   columns: PropTypes.arrayOf(
//     PropTypes.shape({
//       fieldName: PropTypes.string,
//       displayText: PropTypes.string,
//       visible: PropTypes.bool.isRequired,
//       columnSize: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };

// function Users(props) {
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-12">Rendered Generic Custom Table</div>
//       </div>
//       <br />
//       <div className="row">
//         <GenericCustomTable data={props.rows} columns={props.columnProps} />
//       </div>
//     </div>
//   );
// }

function Editor() {
  const users = [
    {
      id: 1,
      first_name: "Shara",
      last_name: "Weeds",
      email: "sweeds0@barnesandnoble.com",
      gender: "Female",
    },
    {
      id: 2,
      first_name: "Conant",
      last_name: "Puddan",
      email: "cpuddan1@ihg.com",
      gender: "Male",
    },
    {
      id: 3,
      first_name: "Mehetabel",
      last_name: "Mawtus",
      email: "mmawtus2@sakura.ne.jp",
      gender: "Female",
    },
  ];

  const columnProps = [
    {
      fieldName: "id",
      displayText: "ID",
      visible: false,
      columnSize: 1,
    },
    {
      fieldName: "first_name",
      displayText: "First name",
      visible: true,
      columnSize: 2,
    },
    {
      fieldName: "last_name",
      displayText: "Last name",
      visible: true,
      columnSize: 2,
    },
    {
      fieldName: "email",
      displayText: "Email",
      visible: true,
      columnSize: 6,
    },
    {
      fieldName: "gender",
      displayText: "Gender",
      visible: true,
      columnSize: 2,
    },
  ];

  const [selected, setSelected] = useState("Home");

  return (
    <>
      <h1>
        Edit Data
      </h1>

      <BookSelector></BookSelector>

      <div className="App mt-4">
        <TabNav
          tabs={["Home", "Settings", "Profile"]}
          selected={selected}
          setSelected={setSelected}
        >
          <Tab isSelected={selected === "Sections"}>
            <p>Some test text</p>
          </Tab>
          <Tab isSelected={selected === "Problems"}>
            <h1>More test text</h1>
          </Tab>
          <Tab isSelected={selected === "Profile"}>
            <ul>
              <li>List test 1</li>
              <li>List test 2</li>
              <li>List test 3</li>
            </ul>
          </Tab>
        </TabNav>
      </div>
    </>
  );
}

export default Editor;
