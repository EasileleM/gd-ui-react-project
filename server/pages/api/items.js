import ItemsService from "../../services/ItemsService";
import Cors from "micro-cors";

const cors = Cors({
    allowedMethods: ['GET'],
    origin: "*"
});

const handler = (req, res) => {
    try {
        const service = new ItemsService();
        const promise = req.query.id ?
            service.getByArrayId(req.query.id.split(',')) : service.getAllItems();
        promise
            .then(items => {
                res.statusCode = 200;
                res.json(JSON.stringify(items))
            }
            )
            .catch(err => {
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