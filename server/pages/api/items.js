import {db} from "../../db/db"

const dbInstance = new db();
let pageCapacity = 4;


export default (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    dbInstance.getAll()
        .then(result => {
            res.statusCode = 200;
            if(req.query.size) {
                pageCapacity = req.query.size;
            }
            if (req.query.page) {
                const pageNumber = req.query.page;
                const startIndex = (pageNumber - 1) * pageCapacity;
                const endIndex = pageNumber * pageCapacity;

                const resultObject = {
                    nextPage: endIndex < result.length,
                    items: result.slice(startIndex, endIndex),
                };

                res.json(JSON.stringify(resultObject))
            } else {
                res.json(JSON.stringify(result));
            }
        })
        .catch(err => {
            res.statusCode = 500;
            res.json(JSON.stringify(err));
        })
}

