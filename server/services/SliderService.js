import {db} from "../db/db";

class SlideService {
    constructor() {
        this.dbInstance = new db();
    }

    getSliders(amount) {
        if (!amount) {
            amount = 0;
        }
        console.log(amount);
        return this.dbInstance.getAmount(amount, "slider");
    }

    getById(id) {
        return this.dbInstance.getById(id, "slider");
    }
}

export default SlideService;