import {db} from "../db/db"

const dbInstance = new db();

const getItems = () => {
     return dbInstance.getItems();
};

const getItemsById = (id) => {
    return dbInstance.getItemsById(id);
};

export {getItems, getItemsById};
