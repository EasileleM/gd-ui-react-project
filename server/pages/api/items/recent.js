import ItemsService from "../../../services/ItemsService";
import Cors from "micro-cors";

const cors = Cors({
    allowedMethods: ['GET'],
    origin: "*"
});

const handler = (req, res) => {
    try {
        const service = new ItemsService();
        service.getAllItems()
            .then(items => {
                    items.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
                    items = service.pagination(req.query.size, req.query.page, items);
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