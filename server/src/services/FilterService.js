import { Filters } from "../db/Models/filters.model";

const langs = Object.freeze({
  ENG: "en",
  RU: "ru",
});

class FilterService {
  constructor(lang) {
    this.setLang(lang);
  }

  setLang(lang) {
    this.lang = Object.values(langs).includes(lang) ? lang : langs.ENG;
  }

  languageSpecific(item) {
    item.categories = item.categories[this.lang];
    return item;
  }

  async getFilterFields() {
    const fields = await Filters.findOne().lean().exec();
    return this.languageSpecific(fields);
  }
}

const FilterServiceInstance = new FilterService();

export default FilterServiceInstance;