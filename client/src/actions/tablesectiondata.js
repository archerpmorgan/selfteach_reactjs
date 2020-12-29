import { STORE_SECTION_TABLE_DATA} from '../constants/actionTypes';

export const storeSectionData = (data) => (dispatch) => {
    dispatch({ type: STORE_SECTION_TABLE_DATA, payload: data });
}
