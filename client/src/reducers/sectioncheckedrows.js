import { STORE_SECTION_CHECKED_ROWS } from '../constants/actionTypes';

export default (data = [], action) => {
  switch (action.type) {
    case STORE_SECTION_CHECKED_ROWS:
      return action.payload;
    default:
      return {
          resources: []
      };
  }
};