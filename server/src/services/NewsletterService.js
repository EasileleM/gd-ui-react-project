import { Newsletter } from "../db/Models/newsletter.model";

class NewsletterService {
    addSignee(email) {
        if (email) {
            const newEmail = new Newsletter({ email });
            return newEmail.save();
        } else {
            throw "No email in the request"; //TODO specify this error message to the user
        }
    }
}

const NewsletterServiceInstance = new NewsletterService();

export default NewsletterServiceInstance;