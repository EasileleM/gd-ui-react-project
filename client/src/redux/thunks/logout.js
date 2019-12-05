import {getAuthentificationInfo} from "../../utils/getAuthentificationInfo";
import {setItems as setCartItems} from "./cart/setItems";
import {userLogout} from "../action-creators/user-action-creator";

export function logout() {
  return (dispatch) => {
    getAuthentificationInfo()
        .then((data) => {
          dispatch(setCartItems(data.cartItems));
          dispatch(userLogout());
          //dispatch(setFavoritesItems(data.favoritesItems));
        });
  };
}