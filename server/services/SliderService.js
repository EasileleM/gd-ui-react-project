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
                    return await this.dbInstance.getById(slider.itemId, "items")
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
        await this.dbInstance.getById(id, "slider")
            .then(res => {
                slider = res[0];
                return this.dbInstance.getById(slider.itemId, "items");
            }).then(res => {
                slider.item = res[0];
                slider.itemId = undefined;
            }).catch(err => {
                throw err;
            });
        return slider;
    }
}

export default SlideService;