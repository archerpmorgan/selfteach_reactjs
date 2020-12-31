import { STORE_PROBLEM_SET_DATA } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const storeProblemSetData = (data) =>  async (dispatch) => {
    try {
        const { data } = await api.getAllBookData();
        dispatch({ type: STORE_PROBLEM_SET_DATA, payload: data });
      } catch (error) {
        console.log(error.message);
      }
}

