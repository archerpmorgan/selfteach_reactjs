import { GET_ALL_BOOK_DATA} from '../constants/actionTypes';

export default (data = [], action) => {
  console.log("bookdata  reducer initiate");
  switch (action.type) {
    case GET_ALL_BOOK_DATA:
      return action.payload;
    default:
      return {
          resources: []
      };
  }
};
