import ItemsService from "../../../services/ItemsService";
import Cors from "micro-cors";

const cors = Cors({
    allowedMethods: ['GET'],
    origin: "*"
});

const handler = (req, res) => {
    try {
        if (!req.query.id) {
            res.statusCode = 400;
            res.json("NO ID PROVIDED");
            return;
        }
        const service = new ItemsService(req.query.lang);
        service.getRelatedItems(req.query.id, req.query.size, req.query.page)
            .then(items => {
                res.statusCode = 200;
                res.json(JSON.stringify(items))
            }
            )
            .catch(err => {
                if (err.message === "NOT FOUND") {
                    res.statusCode = 404;
                    res.json(`NOT FOUND ${req.query.id}`);
                    return;
                }
                if (err.message === "BAD ID") {
                    res.statusCode = 400;
                    res.json(`BAD ID ${req.query.id}`);
                    return;
                }
                res.statusCode = 500;
                res.json(JSON.stringify(err));
            }
            )
    } catch (err) {
        res.statusCode = 500;
        res.json(JSON.stringify(err));
    }
};

export default cors(handler);