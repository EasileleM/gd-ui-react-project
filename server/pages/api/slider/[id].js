import SliderService from "../../../services/SliderService";
import Cors from "micro-cors";

const cors = Cors({
    allowedMethods: ['GET'],
    origin: "*"
});

const handler = (req, res) => {
    try {
        const service = new SliderService();
        service.getById(req.query.id).then(slider => {
            res.statusCode = 200;
            res.json(JSON.stringify(slider));
        });

    } catch (err) {
        res.statusCode = 500;
        res.json(JSON.stringify(err));
    }
};

export default cors(handler);