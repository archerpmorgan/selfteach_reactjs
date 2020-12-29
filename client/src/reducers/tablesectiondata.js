import { STORE_SECTION_TABLE_DATA, INITIALIZE_SECTION_TABLE_DATA } from '../constants/actionTypes';

export default (data = [], action) => {
  switch (action.type) {
    case STORE_SECTION_TABLE_DATA:
      return action.payload;
    case INITIALIZE_SECTION_TABLE_DATA:
      return action.payload;
    default:
      return {
          resources: []
      };
  }
};
