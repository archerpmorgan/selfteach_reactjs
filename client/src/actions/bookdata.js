import * as api from '../api/index.js';

export const getAllBookData = () => async(dispatch) => {
  try {
    const { data } = await api.getAllBookData();
    dispatch({ type: "bookdata/getall", payload: data });
  } catch (error) {
    console.log(error.message);
  }
}
