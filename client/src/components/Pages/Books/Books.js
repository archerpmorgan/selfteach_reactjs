import React, { useState } from "react";
import Tab from "../../TabNav/Tab";
import TabNav from "../../TabNav/TabNav";
import { Container, Paper, Button, TextareaAutosize } from "@material-ui/core";
import NewBook from "./NewBook";
import MyLibrary from "./MyLibrary";


function Books() {

  const [checked, setChecked] = React.useState(["My Library"]);
  const [selectedTab, setSelectedTab] = useState("Sections");

  return (
    <Container>
      <TabNav
        tabs={["My Library", "Public Library", "New Book"]}
        selected={selectedTab}
        setSelected={setSelectedTab}
      >
        <Tab isSelected={selectedTab === "My Library"}>
          <MyLibrary></MyLibrary>
        </Tab>
        <Tab isSelected={selectedTab === "Public Library"}>
          <p>Public Library</p>
        </Tab>
        <Tab isSelected={selectedTab === "New Book"}>
          <NewBook></NewBook>
        </Tab>
      </TabNav>
    </Container>
  );
}

export default Books;
