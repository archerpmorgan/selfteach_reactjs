import { STORE_SECTION_CHECKED_ROWS} from '../constants/actionTypes';

export const storeSectionCheckedRows = (data) => (dispatch) => {
    dispatch({ type: STORE_SECTION_CHECKED_ROWS, payload: data });
}
