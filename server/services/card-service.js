import { cards } from "../database/cards";


export const CardService = {
  getById(id) {
    const numberId = Number(id);
    return cards.find((cur) => {
      return cur.id === numberId;
    })
  },

  getAll() {
    return cards;
  }
}