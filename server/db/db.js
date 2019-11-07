import MongoDB from "mongodb";
import filter from "../pages/api/items/filter";


const uri = process.env.MONGODB_URI || "mongodb+srv://admin:qwerty123456789@react-vptyr.mongodb.net/test?retryWrites=true&w=majority";
const client = MongoDB.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});


export class db {
    constructor() {
        this.dbName = "shop";
        this.dbPromise = this.getDbPromise()
    }

    async getDbPromise() {
        if (!client.isConnected()) {
            return await client.connect().then(res => {
                console.log(`DB is connected! Yay!`);
                return client.db(this.dbName)
            }).catch(err => {
                console.log(`DB is NOT connected. Error: ${err}`);
            });
        }
        return client.db(this.dbName);
    }

    getAll(collection) {
        return this.dbPromise.then(db => {
            return db
                .collection(collection)
                .find({})
                .toArray()
        })

    }

    filter(collection, filter = {}) {
        return this.dbPromise.then(db => {
            return db
                .collection(collection)
                .find(filter)
                .toArray()
        })
    }

    getById(collection, id) {
        if (!MongoDB.ObjectId.isValid(id)) {
            return Promise.reject(new Error(`BAD ID`));
        }
        return this.dbPromise.then(db => {
            return db
                .collection(collection)
                .findOne({"_id": MongoDB.ObjectId(id)})
        })
    }

    getByIdArray(collection, id) {
        const idArray = id
            .slice(0)
            .filter((id) => MongoDB.ObjectId.isValid(id))
            .map((id) => MongoDB.ObjectId(id));
        return this.dbPromise.then(db => {
            return db
                .collection(collection)
                .find({"_id": {$in: idArray}})
                .toArray();
        })
    }

    getAmount(amount, collection) {
        return this.dbPromise.then(db => {
            return db
                .collection(collection)
                .find({})
                .limit(Number(amount))
                .toArray();
        })
    }

    insertOne(collection, objToInsert) {
        return this.dbPromise.then(db => {
            return db
                .collection(collection)
                .insertOne(objToInsert);
        })
    }
}

