import {db} from "../db/db";

class ItemsService {
    constructor() {
        this.dbInstance = new db();
    }

    getAllItems() {
        return this.dbInstance.getAll("items");
    }

    getById(id) {
        return this.dbInstance.getById("items", id);
    }

    getByIdArray(id) {
        return this.dbInstance.getByIdArray("items", id);
    }

    pagination(items, pageSize = 4, pageNumber = 1) {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = pageNumber * pageSize;

        return {
            nextPage: endIndex < items.length,
            items: items.slice(startIndex, endIndex),
        };
    }
}

export default ItemsService;