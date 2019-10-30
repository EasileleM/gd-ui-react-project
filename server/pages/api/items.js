import {db} from "../../db/db"

const dbInstance = new db();
const pageCapacity = 4;


export default (req, res) => {
    dbInstance.getAll()
        .then(result => {
            res.statusCode = 200;
            if (req.query.page) {
                const pageNumber = req.query.page;
                const startIndex = (pageNumber - 1) * pageCapacity;
                const endIndex = pageNumber * pageCapacity
                res.json(JSON.stringify(result.slice(startIndex, endIndex)))
            } else {
                res.json(JSON.stringify(result));
            }
        })
        .catch(err => {
            res.statusCode = 500;
            res.json(JSON.stringify(err));
        })
}
