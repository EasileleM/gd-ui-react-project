import ItemsService from "../../../services/ItemsService";
import Cors from "micro-cors";

const cors = Cors({
    allowedMethods: ['GET'],
    origin: "*"
});

const handler = (req, res) => {
    try {
        const service = new ItemsService();
        if (isNaN(req.query.id) || Number(req.query.id) <= 0) {
            res.statusCode = 400;
            res.json(`BAD ID: ${req.query.id}`);
            return;
        }
        service.getById(req.query.id)
            .then(result => {
                if (!result) {
                    res.statusCode = 404;
                    res.json(`NOT FOUND: ${req.query.id}`);
                } else {
                    res.statusCode = 200;
                    res.json(JSON.stringify(result));
                }
            })
            .catch(err => {
                res.statusCode = 500;
                res.json(JSON.stringify(err));
            })
    } catch (err) {
        res.statusCode = 500;
        res.json(JSON.stringify(err));
    }
};

export default cors(handler);