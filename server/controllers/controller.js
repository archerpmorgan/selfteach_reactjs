import express from "express";
import { database } from "../Data/CosmosDBContext.js";
import { blobServiceClient } from "../Data/BlobStorageContext.js";

const router = express.Router();

export const getAllBookData = async (req, res) => {
  try {
    const { container } = await database.containers.createIfNotExists({ id: "archer" });
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
    const { container } = await database.containers.createIfNotExists({ id: "archer" });
    for (var i = 0; i < data.length; i++) {
      const result = await container.items.upsert(data[i]);
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
    const { container } = await database.containers.createIfNotExists({ id: "archer" });
    for (var i = 0; i < data.length; i++) {
      const result = await container.items.upsert(data[i]);
    }
    res.status(201).json({});
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const getAllProblemSetData = async (req, res) => {
  try {
    const { container } = await database.containers.createIfNotExists({ id: "archerproblemsets" });
    const problemsetdata = await container.items
      .query("SELECT * from archerproblemsets WHERE true")
      .fetchAll();
    res.status(200).json(problemsetdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const postNewProblemSet = async (req, res) => {
  // await getAllProblemSetData({},{}); Maybe try and see if one exists first?
  const data = req.body;
  try {
    const { container } = await database.containers.createIfNotExists({ id: "archerproblemsets" });
    const result = await container.items.create(data);
    res.status(201).json({});
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
}

export const createNewBook = async (req, res) => {
  const data = req.body;
  try {
    const { container } = await database.containers.createIfNotExists({ id: "archer" });
    const result = await container.items.create(data);
    res.status(201).json({});
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
}

export const updateProblemSet = async (req, res) => {
  // await getAllProblemSetData({},{}); Maybe try and see if one exists first?
  const data = req.body;
  try {
    const { container } = await database.containers.createIfNotExists({ id: "archerproblemsets" });
    const result = await container.items.upsert(data.resources[0]);
    res.status(201).json({});
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
}


export const deleteProblemSet = async (req, res) => {
  // await getAllProblemSetData({},{}); Maybe try and see if one exists first?
  const data = req.body;
  try {
    const { container } = await database.containers.createIfNotExists({ id: "archerproblemsets" });
    const { resource: result } = await container.item(data.resources[0].id).delete();
    res.status(201).json({});
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
}


