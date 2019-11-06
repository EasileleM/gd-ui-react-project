import { db } from "../db/db";

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

    getRecentItems(size = 4, page = 1) {
        return this.dbInstance
            .getAll("items")
            .then(items => {
                items.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
                return this.pagination(items, size, page);
            });
    }

    getSalesItems(size = 4, page = 1) {
        return this.dbInstance
            .getAll("items")
            .then(items => {
                items.sort((a, b) => Number(b.sale) - Number(a.sale));
                return this.pagination(items, size, page);
            });
    }

    getRelatedItems(id, size = 4, page = 1) {
        let target;
        return this
            .getById(id)
            .then((item) => {
                if (!item) {
                    return Promise.reject(new Error("NOT FOUND"));
                }
                target = item;
                return this.dbInstance.getAll("items");
            })
            .then(items => {
                const alreadySorted = new Set();
                const target = items.find((item) => item._id == id);
                const brandRelated = items.filter((item) => {
                    return item.brand === target.brand && alreadySorted.add(item._id);
                });
                const categoryRelated = items
                    .filter((item) => {
                        if (!alreadySorted.has(item._id)) {
                            return false;
                        }
                        for (const category of target.categories) {
                            if (item.categories.includes(category)) {
                                alreadySorted.add(item._id);
                                return true;
                            }
                        }
                        return false;
                    });
                categoryRelated.sort((a, b) => {
                    let aMatches = 0;
                    let bMatches = 0;
                    for (const category of target.categories) {
                        if (a.categories.includes(category)) {
                            aMatches++;
                        }
                    }
                    for (const category of target.categories) {
                        if (b.categories.includes(category)) {
                            bMatches++;
                        }
                    }
                    return aMatches - bMatches;
                });
                const rest = items.filter((item) => !alreadySorted.has(item._id));
                const sortedItems = [...brandRelated, ...rest];
                return this.pagination(sortedItems, size, page);
            });
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