import {db} from "../../../db/db"

const dbInstance = new db();

export default (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

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
