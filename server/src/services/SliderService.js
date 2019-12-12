import ItemsService from "./ItemsService";
import {Slider} from "../db/Models/slider.model"
import {LANGS} from "../constants/constants";

class SlideService {
    async getSliders(amount = 0, lang = LANGS.ENG) {
        const SliderItems = await Slider
            .find()
            .limit(Number(amount))
            .lean()
            .exec();

        const promises = SliderItems.map(async (slide) => {
            slide.item = await ItemsService.getById(slide.itemId, lang);
            slide.itemId = undefined;
            return slide;
        });
        return Promise.all(promises);
    }

    async getById(id, lang = LANGS.ENG) {
        const slide = await Slider
            .findById(id)
            .lean()
            .exec();
        slide.item = ItemsService.getById(slide.itemId, lang);
        slide.itemId = undefined;
        return slide;
    }
}

const SlideServiceInstance = new SlideService();

export default SlideServiceInstance;