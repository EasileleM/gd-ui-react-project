import {db} from "../db/db";

const langs = Object.freeze({
    ENG: "en",
    RU: "ru",
});

class ItemsService {
    constructor(lang = langs.ENG) {
        this.dbInstance = new db();
        if (!Object.values(langs).includes(lang)) {
            lang = langs.ENG;
        }
        this.lang = lang;
    }

    languageSpecific(items, lang) {
        if (!Array.isArray(items)) {
            items.description = items.description[lang];
            items.name = items.name[lang];
            return items;
        }
        return items.map(item => {
            item.description = item.description[lang];
            item.name = item.name[lang];
            return item;
        });
    }

    filter(filter) {
        return this.dbInstance.filter("items", filter).then(items => this.languageSpecific(items, this.lang));
    }

    getAllItems() {
        return this.dbInstance.getAll("items").then(items => this.languageSpecific(items, this.lang))
    }

    getById(id) {
        return this.dbInstance.getById("items", id).then(items => this.languageSpecific(items, this.lang))
    }

    getByIdArray(id) {
        return this.dbInstance.getByIdArray("items", id).then(items => this.languageSpecific(items, this.lang))
    }

    getRecentItems(size = 4, page = 1) {
        return this.dbInstance
            .getAll("items").then(items => this.languageSpecific(items, this.lang))
            .then(items => {
                items.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
                return this.pagination(items, size, page);
            });
    }

    getSalesItems(size = 4, page = 1) {
        return this.dbInstance
            .getAll("items").then(items => this.languageSpecific(items, this.lang))
            .then(items => {
                items.sort((a, b) => Number(b.sale) - Number(a.sale));
                return this.pagination(items, size, page);
            });
    }

    getRelatedItems(id, size = 4, page = 1) {
        let target;
        return this
            .getById(id).then(items => this.languageSpecific(items, this.lang))
            .then((item) => {
                if (!item) {
                    return Promise.reject(new Error("NOT FOUND"));
                }
                target = item;
                return this.dbInstance.getAll("items").then(items => this.languageSpecific(items, this.lang))
            })
            .then(items => {
                const alreadySorted = new Set();
                const brandRelated = items.filter((item) => {
                    return item.brand === target.brand && alreadySorted.add(item._id);
                });
                console.log(alreadySorted);
                const categoryRelated = items
                    .filter((item) => {
                        if (alreadySorted.has(item._id)) {
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
                    return bMatches - aMatches;
                });
                const rest = items.filter((item) => !alreadySorted.has(item._id));
                const sortedItems = [...brandRelated, ...categoryRelated, ...rest];
                return this
                    .pagination(sortedItems
                        .filter((item) => String(item._id) !== String(target._id)), size, page);
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