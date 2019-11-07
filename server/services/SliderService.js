import {db} from "../db/db";

class SlideService {
    constructor() {
        this.dbInstance = new db();
    }

    getSliders(amount) {
        if (!amount) {
            amount = 0;
        }
        return this.dbInstance.getAmount(amount, "slider")
            .then(res => {
                const promises = res.map(async slider => {
                    return await this.dbInstance.getById("items", slider.itemId)
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
        await this.dbInstance.getById("slider", id)
            .then(res => {
                slider = res;
                return this.dbInstance.getById("items", slider.itemId);
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