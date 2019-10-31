import {db} from "../../db/db"

const dbInstance = new db();


export default (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (req.method === "POST"){
        console.log(req.body)
    }
}
