import {Filters} from "../db/Models/filters.model";

const langs = Object.freeze({
  ENG: "en",
  RU: "ru",
});

class FilterService {
  constructor(lang = langs.ENG) {
    if (!Object.values(langs).includes(lang)) {
      lang = langs.ENG;
    }
    this.lang = lang;
  }

  setLang(lang) {
    if (!Object.values(langs).includes(lang)) {
      lang = langs.ENG;
    }
    this.lang = lang;
  }

  languageSpecific(item, lang) {
    item.categories = item.categories[lang];
    return item;
  }

  getFilterFields() {
    return Filters
        .find()
        .lean()
        .exec()
        .then(item => this.languageSpecific(item[0], this.lang));
  }
}

const FilterServiceInstance = new FilterService();

export default FilterServiceInstance;