import {LANGS} from "../constants/constants";
import {User} from "../db/Models/user.model";
import ItemsServiceInstance from "./ItemsService";

class UserService {
  async setFavorites(email, favorites) {
    return User.updateOne(
        {email},
        {$set: {favorites}},
        {upsert: true}).exec();
  }

  async setCart(email, cart) {
    return User.updateOne(
        {email},
        {$set: {cart}},
        {upsert: false}).exec();
  }

  async prepare(rawUser, lang = LANGS.ENG) {
    const preparedUser = {
      info: {
        _id: rawUser._id,
        email: rawUser.email,
        firstName: rawUser.firstName,
        lastName: rawUser.lastName
      }
    };

    if (rawUser.cart) {
      preparedUser.cartItems = rawUser.cart.map((item) => {
        return {
          color: item.color,
          amount: item.amount,
          size: item.size,
          generalData: ItemsServiceInstance.getById(item.itemId, lang)
        }
      });
    }

    if (rawUser.favorites) {
      const favoritesItems = await ItemsServiceInstance.getByIdArray(rawUser.favorites, lang);
      preparedUser.favoritesItems = favoritesItems.items;
    }

    return preparedUser;
  }
}

const UserServiceInstance = new UserService();

export default UserServiceInstance;