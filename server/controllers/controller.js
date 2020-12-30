import { Item } from "@azure/cosmos";
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
  console.log(req.body);
  try {
    req.body.resources.forEach(Item => {
      console.log(Item.id)
    });
    // const bookdata = await container.items
    //   .query("SELECT * from archer WHERE true")
    //   .fetchAll();
    res.status(201).json({});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};