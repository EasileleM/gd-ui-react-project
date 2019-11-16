import SliderService from "../../services/SliderService";
import Cors from "micro-cors";

const cors = Cors({
    allowedMethods: ['GET'],
    origin: "*"
});

const handler = (req, res) => {
    try {
        const service = new SliderService(req.query.lang);
        service.getSliders(req.query.amount)
            .then(slides => {
                    res.statusCode = 200;
                    res.json(JSON.stringify(slides))
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