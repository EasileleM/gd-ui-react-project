import {db} from "../../../db/db"

const dbInstance = new db();

export default (req, res) => {
    const {
        query: { id },
    } = req;

    dbInstance.getById("items", id)
        .then(result => {
            res.statusCode = 200;
            res.json(JSON.stringify(result));
        })
        .catch(err => {
            res.statusCode = 500;
            res.json(JSON.stringify(err));
        })
}
