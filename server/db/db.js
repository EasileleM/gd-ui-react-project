import MongoDB from "mongodb";

export class db {
    constructor() {
        this.uri = process.env.MONGODB_URI || "mongodb+srv://admin:qwerty123456789@react-vptyr.mongodb.net/test?retryWrites=true&w=majority";
        this.client = MongoDB.MongoClient(this.uri, {useNewUrlParser: true, useUnifiedTopology: true});
        this.dbName = "shop";
        this.dbConnection = this.client.connect();
    }

    async getAll() {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName)
            return db
                .collection("items")
                .find({})
                .toArray();
        });
    }

    async getById(id) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName)
            return db
                .collection("items")
                .find({"id": id})
                .toArray();
        });
    }

    async getSlider(id) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName)
            return db
                .collection("slider")
                .find({"id": id})
                .toArray();
        });
    }

    async postNewsletterSignee(email) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName)
            return db
                .collection("newsletter")
                .insertOne(email);
        });
    }
};

