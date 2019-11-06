import {db} from "../db/db";

class ItemsService {
    constructor() {
        this.dbInstance = new db();
        this.pageSize = 4;
        this.pageNumber = 1;
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

    pagination(pageSize = 4, pageNumber = 1, items) {
        if (pageSize) {
            this.pageSize = pageSize;
        }
        if (pageNumber) {
            this.pageNumber = pageNumber;
        }

        const startIndex = (this.pageNumber - 1) * this.pageSize;
        const endIndex = this.pageNumber * this.pageSize;

        return {
            nextPage: endIndex < items.length,
            items: items.slice(startIndex, endIndex),
        };
    }
}

export default ItemsService;