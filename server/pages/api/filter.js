import FilterService from "../../services/FilterService";
import Cors from "micro-cors";

const cors = Cors({
    allowedMethods: ['GET'],
    origin: "*"
});

const handler = (req, res) => {
    try {
        const service = new FilterService(req.query.lang);
        return service
            .getFilterFields()
            .then(item => {
                res.statusCode = 200;
                delete item._id;
                res.json(JSON.stringify(item));
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