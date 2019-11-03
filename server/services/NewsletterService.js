import {db} from "../db/db";

class NewsletterService {
    constructor() {
        this.dbInstance = new db();
    }

    addSignee(requestBody) {
        if (requestBody.email) {
            return this.dbInstance.insertOne("newsletter",{"email": requestBody.email});
        } else {
            throw "No email in the request";
        }
    }
}

export default NewsletterService;