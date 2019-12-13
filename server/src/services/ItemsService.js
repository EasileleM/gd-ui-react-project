import { Items } from '../db/Models/item.model';
import { LANGS } from "../constants/constants";
import { filterStrategies } from './strategies/filterStrategies';
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

    async getAllExcludeOne(exludedId, lang = LANGS.ENG) {
        const items = await Items
            .find({ _id: { $ne: exludedId } })
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
        const items = await this.getAllExcludeOne(target._id, lang);
        items.sort((firstItem, secondItem) => {
            if (firstItem.brand !== target.brand || secondItem.brand !== target.brand) {
                return (secondItem.brand === target.brand) - (firstItem.brand === target.brand);
            }
            let categoryMatchFirst = 0;
            let categoryMatchSecond = 0;
            for (const category of target.categories) {
                if (firstItem.categories.includes(category)) {
                    categoryMatchFirst++;
                }
                if (secondItem.categories.includes(category)) {
                    categoryMatchSecond++;
                }
            }
            return categoryMatchSecond - categoryMatchFirst;
        });
        return this.pagination(items, size, page);
    }

    async search(query, lang) {
        if (!query.search) {
            return await this.getAllItems();
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
            for (const field in filterStrategies) {
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
                    if (!filterStrategies[field](item, filters, field)) {
                        return false;
                    };
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