import ItemsService from "../../../services/ItemsService";
import Cors from "micro-cors";

const cors = Cors({
    allowedMethods: ['GET'],
    origin: "*",
});

const handler = (req, res) => {
    try {
        const service = new ItemsService(req.query.lang);
        service.search(req.query)
            .then(items => {
                let result = service.filter(items, req.query);
                result = service.pagination(result, req.query.size, req.query.page);
                res.statusCode = 200;
                res.json(JSON.stringify(result));
            }
            )
            .catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.json(JSON.stringify(err));
            }
            )
    } catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.json(JSON.stringify(err));
    }
};

export default cors(handler);