import { db } from "../db/db";

const langs = Object.freeze({
  ENG: "en",
  RU: "ru",
});

class FilterService {
  constructor(lang = langs.ENG) {
    this.dbInstance = new db();
    if (!Object.values(langs).includes(lang)) {
      lang = langs.ENG;
    }
    this.lang = lang;
  }

  languageSpecific(item, lang) {
    item.categories = item.categories[this.lang];
    return item;
  }

  getFilterFields() {
    return this.dbInstance.getAll("filters").then(item => this.languageSpecific(item[0], this.lang));
  }
}

export default FilterService;