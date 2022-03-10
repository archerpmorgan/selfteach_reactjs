import React, { useState } from "react";
import Tab from "../../TabNav/Tab";
import TabNav from "../../TabNav/TabNav";
import { Container, Paper, Button, TextareaAutosize } from "@material-ui/core";
import NewBook from "./NewBook";
import MyLibrary from "./MyLibrary";
import Editor from "../Editor/Editor";


function Books() {

  const [selectedTab, setSelectedTab] = useState("Sections");

  return (
    <Container>
      <TabNav
        tabs={["My Library", "Public Library", "New Book", "Book Data Editor"]}
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
        <Tab isSelected={selectedTab === "Book Data Editor"}>
          <Editor></Editor>
        </Tab>
      </TabNav>
    </Container>
  );
}

export default Books;
