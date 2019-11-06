import ItemsService from "../../../services/ItemsService";
import Cors from "micro-cors";

const cors = Cors({
    allowedMethods: ['GET'],
    origin: "*"
});

const handler = (req, res) => {
    try {
        const service = new ItemsService();
        service.getById(req.query.id)
            .then(result => {
                if (!result) {
                    res.statusCode = 404;
                    res.json(`NOT FOUND ${req.query.id}`);
                } else {
                    res.statusCode = 200;
                    res.json(JSON.stringify(result));
                }
            })
            .catch(err => {
                if (err.message === "BAD ID") {
                    res.statusCode = 400;
                    res.json(`BAD ID ${req.query.id}`);
                    return;
                }
                res.statusCode = 500;
                res.json(JSON.stringify(err));
            })
    } catch (err) {
        res.statusCode = 500;
        res.json(JSON.stringify(err));
    }
};

export default cors(handler);