import axios from 'axios';

const url = 'http://localhost:5000/';

export const getAllBookData = () => axios.get(url + "books");
export const flipBookSections = (newBookData) => axios.post(url + "sections", newBookData);


