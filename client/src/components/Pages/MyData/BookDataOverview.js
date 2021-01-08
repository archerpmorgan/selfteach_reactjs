import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import StatsTable from "./StatsTable";
import { Typography, Box, Container } from "@material-ui/core";
import Donut from "./Donut";
import { summaryStatistics } from "../../../common/DataFunctions.js";
import { useSelector } from "react-redux";

function BookDataOverview() {
  const raw = useSelector((state) => state.bookdata);

  const allbooksdatacooked = [];
  raw.resources.forEach((book) => {
    let summaryData = summaryStatistics(book);
    allbooksdatacooked.push({
      title: book.title,
      image: book.imageURL,
      problemData: [
        { name: "Complete", value: summaryData.completedProblems },
        {
          name: "Incomplete",
          value: summaryData.totalProblems - summaryData.completedProblems,
        },
      ],
      sectionData: [
        { name: "Studied", value: summaryData.studiedSections },
        {
          name: "Not Studied",
          value: summaryData.totalSections - summaryData.studiedSections,
        },
      ],
      summaryData
    });
  });

  const useStyles = makeStyles({
    bookdata: {
      border: 20,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      padding: "30px",
      margin: "50px",
      fontFamily: "Palatino",
    },
  });

  const classes = useStyles();

  return (
    <Box className={classes.bookdata}>
      {allbooksdatacooked.map((item, index) => (
        <Container key={index}>
          <img src={item.image} alt={item.title} />
          <Typography>{item.title}</Typography>
          <StatsTable summaryData={item.summaryData} />
          <Donut data={item.problemData} textlabelname="Problems" />
          <Typography>Problem Progress</Typography>
          <Donut data={item.sectionData} textlabelname="Sections" />
          <Typography>Section Progress</Typography>
        </Container>
      ))}
    </Box>
  );
}

export default BookDataOverview;
