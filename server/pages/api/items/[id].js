import {db} from "../../../db/db"

const dbInstance = new db();

export default (req, res) => {
    const {
        query: { id },
    } = req;

    dbInstance.getById(id)
        .then(result => {
            res.statusCode = 200;
            res.json(JSON.stringify(result[0]));
        })
        .catch(err => {
            res.statusCode = 500;
            res.json(JSON.stringify(err));
        })
}
