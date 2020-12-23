import { GET_ALL_BOOK_DATA} from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getAllBookData = () => async(dispatch) => {
  try {
    const { data } = await api.getAllBookData();
    dispatch({ type: GET_ALL_BOOK_DATA, payload: data });
  } catch (error) {
    console.log(error.message);
  }
}
