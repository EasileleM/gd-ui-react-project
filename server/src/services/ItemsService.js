import { Items } from '../db/Models/item.model';
import { LANGS, FILTER_FIELDS } from "../constants/constants";
import mongoose from 'mongoose';

class ItemsService {
    languageSpecific(items, lang = LANGS.ENG) {
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

    async getAllItems(lang = LANGS.ENG) {
        const items = await Items
            .find()
            .lean()
            .exec();
        return this.languageSpecific(items, lang);
    }

    async getById(id, lang = LANGS.ENG) {
        const item = await Items
            .findById(id)
            .lean()
            .exec();
        return this.languageSpecific(item, lang);
    }

    async getByIdArray(ids, lang = LANGS.ENG) {
        const objectIds = ids.map((current) => {
            try {
                return mongoose.Types.ObjectId(current);
            }
            catch (e) {
                return null;
            }
        });

        const items = await Items
            .find({ '_id': { $in: objectIds } })
            .lean()
            .exec();
        const rejectedId = [];
        if (ids.length > items.length) {
            for (const id of ids) {
                if (!items.some((item) => String(item._id) === String(id))) {
                    rejectedId.push(id);
                }
            }
        }
        return { rejectedId, items: this.languageSpecific(items, lang) };
    }

    async getRecentItems(size = 4, page = 1, lang = LANGS.ENG) {
        const items = await Items
            .find()
            .sort({ creationDate: -1 })
            .limit(Number(size))
            .lean()
            .exec();
        return this.pagination(this.languageSpecific(items, lang), size, page);
    }

    async getSalesItems(size = 4, page = 1, lang = LANGS.ENG) {
        const items = await Items
            .find()
            .lean()
            .exec();
        items.sort((a, b) => Number(b.sale) - Number(a.sale));
        return this.pagination(this.languageSpecific(items, lang), size, page);
    }

    async getRelatedItems(id, size = 4, page = 1, lang = LANGS.ENG) {
        const target = await this.getById(id);
        if (!target) {
            throw new Error(404);
        }
        const items = this.languageSpecific(await this.getAllItems(), lang);
        const alreadySorted = new Set();
        const brandRelated = items.filter((item) => {
            return item.brand === target.brand && alreadySorted.add(item._id);
        });
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

        const restItems = items.filter((item) => !alreadySorted.has(item._id));
        const sortedItems = [...brandRelated, ...categoryRelated, ...restItems];
        return this
            .pagination(sortedItems
                .filter((item) => String(item._id) !== String(target._id)), size, page);
    }

    async search(query, lang) {
        if (!query.search) {
            return this.getAllItems();
        }
        const items = await Items
            .find({ $text: { $search: query.search } })
            .lean()
            .exec();
        return this.languageSpecific(items, lang);
    }

    filter(items, query) {
        let result = items;
        if (query.filter === 'true') {
            const filters = {};
            for (const field of FILTER_FIELDS) {
                if (query[field]) {
                    if (field === 'maxprice' || field === 'minprice') {
                        filters[field] = query[field];
                    }
                    else {
                        filters[field] = new Set(query[field].split(',').map((item) => item.split('+').join(' ')));
                    }
                }
            }
            result = items.filter((item) => {
                for (const field in filters) {
                    if (field === 'minprice') {
                        if (Number(item.price) < Number(filters[field])) {
                            return false;
                        }
                    }
                    else if (field === 'maxprice') {
                        if (Number(item.price) > Number(filters[field])) {
                            return false;
                        }
                    }
                    else if (field === 'brands') {
                        if (!filters[field].has(item.brand)) {
                            return false;
                        }
                    }
                    else {
                        if (!item[field].length) {
                            return false;
                        }
                        let matches = 0;
                        for (const value of item[field]) {
                            if (filters[field].has(value)) {
                                matches++;
                            }
                        }
                        if (!matches) {
                            return false;
                        }
                    }
                }
                return true;
            });
        }
        return result;
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

const ItemsServiceInstance = new ItemsService();

export default ItemsServiceInstance;