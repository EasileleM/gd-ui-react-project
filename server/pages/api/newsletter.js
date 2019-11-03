import Cors from "micro-cors";
import NewsletterService from "../../services/NewsletterService"

const cors = Cors({
    allowedMethods: ['POST'],
    origin: "*"
});

const handler = (req, res) => {
    try {
        if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            res.end("OK");
        } else {
            const service = new NewsletterService();
            service.addSignee(req.body).then((result) => {
                    res.statusCode = 201;
                    res.json(JSON.stringify(result))
                }
            ).catch(err => {
                    res.statusCode = 500;
                    res.json(JSON.stringify(err));
                }
            );
        }
    } catch (err) {
        res.statusCode = 500;
        res.json(JSON.stringify(err));
    }
};

export default cors(handler);