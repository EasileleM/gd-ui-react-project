import ItemsService from "./ItemsService";
import {Slider} from "../db/Models/slider.model"
import {Items} from "../db/Models/item.model";

class SlideService {
    constructor(lang) {
        this.itemService = new ItemsService(lang)
    }

    getSliders(amount) {
        if (!amount) {
            amount = 0;
        }
        return Slider
            .find()
            .limit(Number(amount))
            .lean()
            .exec()
            .then(res => {
                const promises = res.map(async slider => {
                    return await this.itemService.getById(slider.itemId)
                        .then(sliderItem => {
                                slider.item = sliderItem;
                                slider.itemId = undefined;
                                return slider
                            }
                        );
                });
                return Promise.all(promises);
            })
    }

    async getById(id) {
        let slider;
        await Slider.findById(id)
            .lean()
            .exec()
            .then(res => {
                slider = res;
                return Items.findById(slider.itemId)
                    .lean()
                    .exec();
            }).then(res => {
                slider.item = res;
                slider.itemId = undefined;
            }).catch(err => {
                throw err;
            });
        return slider;
    }
}

export default SlideService;