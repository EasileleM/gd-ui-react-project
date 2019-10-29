import {db} from "../../db/db"

const dbInstance = new db();

export default (req, res) => {
    dbInstance.getAll("items")
        .then(result => {
            res.statusCode = 200;
            res.json(JSON.stringify(result));
        })
        .catch(err => {
            res.statusCode = 500;
            res.json(JSON.stringify(err));
        })
}
