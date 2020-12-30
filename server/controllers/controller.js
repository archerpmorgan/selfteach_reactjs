import express from "express";
import { container } from "../Data/CosmosDBContext.js";

const router = express.Router();

export const getAllBookData = async (req, res) => {
  try {
    const bookdata = await container.items
      .query("SELECT * from archer WHERE true")
      .fetchAll();
    res.status(200).json(bookdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const flipBookSections = async (req, res) => {
  const data = req.body.resources;
  try {
    for (var i = 0; i < data.length; i++) {
      const result = await container.items.upsert(data[i]);
      console.log(result);
    }
    res.status(201).json({});
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const flipBookProblems = async (req, res) => {
  const data = req.body.resources;
  try {
    for (var i = 0; i < data.length; i++) {
      const result = await container.items.upsert(data[i]);
      console.log(result);
    }
    res.status(201).json({});
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};




