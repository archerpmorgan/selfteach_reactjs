import * as api from '../api/index.tsx';

export const getAllBookData = () => async(dispatch) => {
  try {
    // console.log(jwt);
    const { data } = await api.getAllBookData();
    dispatch({ type: "bookdata/getall", payload: data });
  } catch (error) {
    console.log(error.message);
  }
}
