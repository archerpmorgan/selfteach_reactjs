import { STORE_PROBLEM_SET_DATA } from '../constants/actionTypes';

export default problemSetReducer = (data = [], action) => {
  switch (action.type) {
    case STORE_PROBLEM_SET_DATA:
      return action.payload;
    default:
      return {
          resources: []
      };
  }
};
