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
                res.statusCode = 200;
                res.json(JSON.stringify(result));
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