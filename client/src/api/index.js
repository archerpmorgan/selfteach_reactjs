import axios from 'axios';

const url = 'http://localhost:5000/';

export const getAllBookData = () => axios.get(url + "books");
export const getAllProblemSetData = () => axios.get(url + "problemset");
export const flipBookSections = (newBookData) => axios.post(url + "sections", newBookData);
export const flipBookProblems = (newBookData) => axios.post(url + "problems", newBookData);
export const postNewProblemSet = (newProblemSetdata) => axios.post(url + "problemset/new", newProblemSetdata);
export const postNewBook = (newBookData) => axios.post(url + "books/new", newBookData);
export const deleteProblemSet = (problemSetdata) => axios.post(url + "problemset/delete", problemSetdata);
export const updateProblemSet = (problemSetdata) => axios.post(url + "problemset", problemSetdata);


