import {db} from "../../db/db"

const dbInstance = new db();


export default (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === "POST") {
        dbInstance.postNewsletterSignee({"email": req.body.email})//todo add check if email null
            .then((result) => {
                    res.statusCode = 201;
                    res.redirect(req.origin);
                    return;
                }
            ).catch(err => {
                res.statusCode = 500;
                res.json(JSON.stringify(err));
                return;
            }
        )
    } else {
        res.statusCode = 404;
        res.end('Not found')
        return;
    }
}
