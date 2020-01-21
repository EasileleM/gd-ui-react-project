import loadItem from "../../../utils/loadItem";
import {setItem} from "./actions";

export function loadItemAction(id, language) {
    return async (dispatch, getState) => {
        //todo error tracking here
        const response = await loadItem(id, language);
        dispatch(setItem(response.data));
        return response;
    };
}
