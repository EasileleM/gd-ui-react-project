import {loadFilters} from "../../../utils/loadFilters";
import {setAvailableFilters} from './actions'

export function loadAvailableFilters(language) {
    return async (dispatch, getState) => {
        const result = await loadFilters(language);
        dispatch(setAvailableFilters(result.data));
        return result.data;
    }
};