import {db} from "../../db/db"

const dbInstance = new db();

export default (req, res) => {

    if (req.method === "POST") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Request-Method", "POST, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        dbInstance.postNewsletterSignee({"email": req.body.email})//todo add check if email null
            .then((result) => {
                console.log(req.query.email);
                    res.statusCode = 201;
                    res.json(JSON.stringify(result))
                }
            ).catch(err => {
                res.statusCode = 500;
                res.json(JSON.stringify(err));
            }
        );
    } else {
        res.statusCode = 404;
        res.end('Not found')
    }
}
