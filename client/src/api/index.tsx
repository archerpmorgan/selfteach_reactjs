import axios from "axios";

const url = "http://localhost:5000/";

let config = {
  headers: {
    Authorization: ""
  }
}

export const getAllBookData = () => axios.get(url + "books");
export const getAllProblemSetData = () => axios.get(url + "problemset");
export const flipBookSections = (newBookData: any) =>
  axios.post(url + "sections", newBookData);
export const flipBookProblems = (newBookData: any) =>
  axios.post(url + "problems", newBookData);
export const postNewProblemSet = (newProblemSetdata: any) =>
  axios.post(url + "problemset/new", newProblemSetdata);
export const postNewBook = (newBookData: any) =>
  axios.post(url + "books/new", newBookData);
export const deleteProblemSet = (problemSetdata: any) =>
  axios.post(url + "problemset/delete", problemSetdata);
export const updateProblemSet = (problemSetdata: any) =>
  axios.post(url + "problemset", problemSetdata);
