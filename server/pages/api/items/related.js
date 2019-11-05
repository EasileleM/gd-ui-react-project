import ItemsService from "../../../services/ItemsService";
import Cors from "micro-cors";

const cors = Cors({
    allowedMethods: ['GET'],
    origin: "*"
});

const handler = (req, res) => {
    try {
        const service = new ItemsService();
        const size = req.query.size;
        service.getAllItems()
            .then(items => {
                    items.sort((a, b) => Number(b.sale) - Number(a.sale));
                    items = size ? items.slice(0, size) : items.slice(0, 3);
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