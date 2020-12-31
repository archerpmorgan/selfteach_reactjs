import axios from 'axios';

const url = 'http://localhost:5000/';

export const getAllBookData = () => axios.get(url + "books");
export const getAllProblemSetData = () => axios.get(url + "problemsets");
export const flipBookSections = (newBookData) => axios.post(url + "sections", newBookData);
export const flipBookProblems = (newBookData) => axios.post(url + "problems", newBookData);


