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
                .find({})
                .toArray();
        });
    }

    async getById(collection, id) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName)
            if (!MongoDB.ObjectId.isValid(id)) {
                return Promise.reject(new Error(`BAD ID`));
            }
            return db
                .collection(collection)
                .findOne({"_id": MongoDB.ObjectId(id)});
        });
    }

    async getByIdArray(collection, id) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName)
            const idArray = id
                .slice(0)
                .filter((id) => MongoDB.ObjectId.isValid(id))
                .map((id) => MongoDB.ObjectId(id));
            return db
                .collection(collection)
                .find({"_id": {$in: idArray}})
                .toArray();
        });
    }

    async getAmount(amount, collection) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName);
            return db
                .collection(collection)
                .find({})
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

