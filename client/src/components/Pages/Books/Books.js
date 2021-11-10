import React, { useState } from "react";
import Tab from "../../TabNav/Tab";
import TabNav from "../../TabNav/TabNav";
import { Container, Paper, Button, TextareaAutosize } from "@material-ui/core";
import NewBook from "./NewBook";

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
            <NewBook bookname={checked[0]}></NewBook>
          </Tab>
          <Tab isSelected={selectedTab === "Public Library"}>
            <NewBook bookname={checked[0]}></NewBook>
          </Tab>
          <Tab isSelected={selectedTab === "New Book"}>
            <NewBook bookname={checked[0]}></NewBook>
          </Tab>
        </TabNav>
    </Container>
  );
}

export default Books;
