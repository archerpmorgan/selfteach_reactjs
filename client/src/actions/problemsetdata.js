import * as api from '../api/index.js';

export const getAllProblemSetData = () =>  async (dispatch) => {
    try {
        const { data } = await api.getAllProblemSetData();
        dispatch({ type: "problemsetdata/getall", payload: data });
      } catch (error) {
        console.log(error.message);
      }
}

export const makeNewProblemSet = (data) =>  async (dispatch) => {
  try {
      // should be a opost instead now
      // const { data } = await api.getAllProblemSetData();
      dispatch({ type: "problemsetdata/getall", payload: data });
    } catch (error) {
      console.log(error.message);
    }
}

