import { Newsletter } from "../db/Models/newsletter.model";

class NewsletterService {
    addSignee(email) {
        const newEmail = new Newsletter({ email });
        return newEmail.save();
    }
}

const NewsletterServiceInstance = new NewsletterService();

export default NewsletterServiceInstance;