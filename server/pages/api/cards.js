import {CardService} from "../../services/card-service";

export default (req, res) => {
  const {
    method
  } = req

  switch (method) {
    case 'GET':
      res.status(200).json(CardService.getAll());
      break;
  }
}