import {LANGS, PASSWORD_REGEX} from "../constants/constants";
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

  authenticateUser(email, password) {
    return User.findOne({'email': email}, async function (err, user) {
      if (err) {
        throw err;
      }
      if (!user) {
        throw new Error('User was not found')
      }
      console.log(password)
      console.log(user.password)
      const isPasswordRight = await bcrypt.compare(password, user.password);
      if (!isPasswordRight) {
        throw new Error('Wrong password/email');
      }
      console.log("authenticateUser === true")
      return user;
    });
  }
}

const UserServiceInstance = new UserService();

export default UserServiceInstance;