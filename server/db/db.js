import MongoDB from "mongodb";

export class db {
    constructor() {
        this.uri = process.env.MONGODB_URI || "mongodb+srv://admin:qwerty123456789@react-vptyr.mongodb.net/test?retryWrites=true&w=majority";
        this.client = MongoDB.MongoClient(this.uri, {useNewUrlParser: true, useUnifiedTopology: true});
        this.dbName = "shop";
        this.dbConnection = this.client.connect();
    }

    async getAll(collection) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName)
            return db
                .collection(collection)
                .find({}, {projection:{ _id: 0 }})
                .toArray();
        });
    }

    async getById(id, collection) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName)
            return db
                .collection(collection)
                .findOne({"id": id}, {projection:{ _id: 0 }});
        });
    }

    async getAmount(amount, collection) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName);
            return db
                .collection(collection)
                .find({}, {projection:{ _id: 0 }})
                .limit(Number(amount))
                .toArray();
        });
    }
    
    async insertOne(collection, objToInsert) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName)
            return db
                .collection(collection)
                .insertOne(objToInsert);
        });
    }
};

