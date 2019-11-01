import {db} from "../../db/db"
import { useRouter } from 'next/router'

const dbInstance = new db();


export default (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === "POST") {
        dbInstance.postNewsletterSignee({"email": req.body.email})//todo add check if email null
            .then((result) => {
                console.log(req.body.email);
                    res.statusCode = 201;
                    res.json(JSON.stringify(result))
                }
            ).catch(err => {
                res.statusCode = 500;
                res.json(JSON.stringify(err));
            }
        )
    } else {
        res.statusCode = 404;
        res.end('Not found')
    }
}
