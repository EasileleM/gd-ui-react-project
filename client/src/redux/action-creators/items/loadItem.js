import loadItem from "../../../utils/loadItem";
import {setItem} from "./actions";

export function loadItemAction(id) {
    console.log("here there")

    return async (dispatch, getState) => {
        //todo error tracking here
        const response = await loadItem(id);
        dispatch(setItem(response.data));
    };
}
