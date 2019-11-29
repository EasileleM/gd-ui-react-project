import Cors from "micro-cors";
import bcrypt from 'bcrypt';
import {User} from "../../db/Models/user.model";

const cors = Cors({
  allowedMethods: ['GET'],
  origin: "*"
});

const handler = async (req, res) => {

};

export default cors(handler);