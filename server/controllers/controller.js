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
