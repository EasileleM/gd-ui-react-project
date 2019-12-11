import ItemsService from "./ItemsService";
import { Slider } from "../db/Models/slider.model"
import { Items } from "../db/Models/item.model";

class SlideService {
    async getSliders(amount = 0) {
        const SliderItems = await Slider
            .find()
            .limit(Number(amount))
            .lean()
            .exec();

        const promises = SliderItems.map(async (slide) => {
            const slideItem = await ItemsService.getById(slider.itemId);
            slide.item = sliderItem;
            slide.itemId = undefined;
            return slideItem;
        });
        return Promise.all(promises);
    }

    async getById(id) {
        const slide = await Slider
            .findById(id)
            .lean()
            .exec();
        const item = await Items
            .findById(slide.itemId)
            .lean()
            .exec();
        slide.item = item;
        slide.itemId = undefined;
        return slide;
    }
}

const SlideServiceInstance = new SlideService();

export default SlideServiceInstance;