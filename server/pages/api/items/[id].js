import {getItemsById} from "../../../services/itemsService"

export default (req, res) => {
    const {
        query: { id },
    } = req;

    res.statusCode = 200;
    res.end(JSON.stringify(getItemsById(id)));
}
