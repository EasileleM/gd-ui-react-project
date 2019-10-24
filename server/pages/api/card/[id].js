import {CardService} from "../../../services/card-service";

export default (req, res) => {
  const {
    query: {id},
    method
  } = req

  switch (method) {
    case 'GET':
      res.status(200).json(CardService.getById(id));
      break;
  }
}