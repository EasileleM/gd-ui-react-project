import loadSlides from "../../../utils/loadSlides";
import {setSliderItem} from "./actions";

export function loadSliderData(amount = 3, language) {
    return async (dispatch) => {
        const sliderData = await loadSlides(amount, language);
        dispatch(setSliderItem(sliderData.data));
    }
}