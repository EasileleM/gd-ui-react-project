import {LANGS} from "../constants/constants";
import {User} from "../db/Models/user.model";
import ItemsServiceInstance from "./ItemsService";
import bcrypt from "bcrypt";

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

  async hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return await bcrypt.hash(password, salt);
  }

  async prepare(rawUser, lang = LANGS.ENG) {
    const preparedUser = {
      info: {
        _id: rawUser._id,
        email: rawUser.email,
        firstName: rawUser.firstName,
        lastName: rawUser.lastName
      },
    };

    if (rawUser.cart) {
      const promises = rawUser.cart.map(async (item) => {
        return {
          color: item.color,
          amount: item.amount,
          size: item.size,
          generalData: await ItemsServiceInstance.getById(item.itemId, lang)
        }
      });
      preparedUser.cartItems = await Promise.all(promises);
    }

    if (rawUser.favorites) {
      const favoritesItems = await ItemsServiceInstance.getByIdArray(rawUser.favorites, lang);
      preparedUser.favoritesItems = favoritesItems.items;
    }

    return preparedUser;
  }

   async authenticateUser(email, password) {
    try{
      const user = await User.findOne({'email': email});
      if (!user) {
        return false
      }
      return await bcrypt.compare(password, user.password);
    }
    catch {
      return false
    }
  }
}

const UserServiceInstance = new UserService();

export default UserServiceInstance;