import loadCard from "../../../utils/loadCard";
import {setCatalog} from "./actions";

export function loadCatalog(page, size, filters, filtersUrl, language) {
    return async (dispatch, getState) => {
        const initialState = getState().itemLoader.catalogCards;
        const result = await loadCard(page, size, filters, filtersUrl, language);
        dispatch(setCatalog([...initialState, ...result.data.items], result.data.nextPage));
        return result;
    }
};