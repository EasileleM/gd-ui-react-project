import { Filters } from "../db/Models/filters.model";
import {LANGS} from "../constants/constants";


class FilterService {
  languageSpecific(item, lang) {
    item.categories = item.categories[lang];
    return item;
  }

  async getFilterFields(lang = LANGS.ENG) {
    const fields = await Filters.findOne()
        .lean()
        .exec();
    return this.languageSpecific(fields, lang);
  }
}

const FilterServiceInstance = new FilterService();

export default FilterServiceInstance;