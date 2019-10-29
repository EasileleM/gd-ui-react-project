import {getItems} from "../../services/itemsService"

export default (req, res) => {

    res.statusCode = 200;
    res.end(JSON.stringify(getItems()));
}
