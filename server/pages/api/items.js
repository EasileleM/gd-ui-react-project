import ItemsService from "../../services/ItemsService";
import Cors from "micro-cors";

const cors = Cors({
    allowedMethods: ['GET'],
    origin: "*"
});

const handler = (req, res) => {
    try {
        if (!req.query.id) {
            res.statusCode = 400;
            res.json("ID IS NOT PROVIDED");
            return;
        }
        const service = new ItemsService();
        const idArray = req.query.id.split(',');
        return service
            .getByIdArray(idArray)
            .then(items => {
                res.statusCode = 200;
                const rejectedId = [];
                if (idArray && idArray.length > items.length) {
                    for (const id of idArray) {
                        if (!items.some((item) => item._id === id)) {
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