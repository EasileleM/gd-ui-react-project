import ItemsService from "../../services/ItemsService";
import Cors from "micro-cors";

const cors = Cors({
    allowedMethods: ['GET'],
    origin: "*"
});

const handler = (req, res) => {
    try {
        const service = new ItemsService();
        const rejectedId = [];
        let promise;
        let idArray = false;
        if (req.query.id) {
            idArray = req.query.id.split(',');
            promise = service.getByIdArray(req.query.id.split(','));
        } else {
            promise = service.getAllItems();
        }
        promise
            .then(items => {
                res.statusCode = 200;
                let rejectedId = [];
                if (idArray && idArray.length > items.length) {
                    for (const id of idArray) {
                        if (!items.some((item) => item.id === id)) {
                            rejectedId.push(id);
                        }
                    }
                }
                res.json(JSON.stringify({ items, rejectedId }));
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