import {db} from "../../../db/db"

const dbInstance = new db();

export default (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const {
        query: {id},
    } = req;

    let slider;
    dbInstance.getSlider(id)
        .then(result => {
            slider = result[0];
            return dbInstance.getById(slider.itemId);
        }).then(result => {
            slider.item = result[0];
            slider.itemId = undefined;
            res.statusCode = 200;
            res.json(JSON.stringify(slider));
        }
    ).catch(err => {
        res.statusCode = 500;
        res.json(JSON.stringify(err));
    })

}