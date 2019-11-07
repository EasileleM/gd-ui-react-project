import MongoDB from "mongodb";
import filter from "../pages/api/items/filter";

const langs = Object.freeze({
    ENG: "en",
    RU: "ru",
});

export class db {
    constructor(lang = langs.ENG) {
        this.uri = process.env.MONGODB_URI || "mongodb+srv://admin:qwerty123456789@react-vptyr.mongodb.net/test?retryWrites=true&w=majority";
        this.client = MongoDB.MongoClient(this.uri, {useNewUrlParser: true, useUnifiedTopology: true});
        this.dbName = "items_test";
        this.dbConnection = this.client.connect().then(res => {
            console.log(`DB is connected! Yay!`);
            return res;
        }).catch(err => {
            console.log( `DB is NOT connected. Error: ${err}`);
            return err;
        });

        if (!Object.values(langs).includes(lang)) {
            lang = langs.ENG;
        }
        this.lang = lang;
    }

    languageSpecific(items, lang) {
        if(!Array.isArray(items)){
            items.description = items.description[lang];
            items.name = items.name[lang];
            return items;
        }
        return items.map(item => {
            item.description = item.description[lang];
            item.name = item.name[lang];
            return item;
        });
    }

    getAll(collection) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName)
            return db
                .collection(collection)
                .find({})
                .toArray()
                .then(items => this.languageSpecific(items, this.lang));;
        });
    }

    filter(collection, filter = {}) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName);
            return db
                .collection(collection)
                .find(filter)
                .toArray()
                .then(items => this.languageSpecific(items, this.lang));;
        });
    }

    getById(collection, id) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName)
            if (!MongoDB.ObjectId.isValid(id)) {
                return Promise.reject(new Error(`BAD ID`));
            }
            return db
                .collection(collection)
                .findOne({"_id": MongoDB.ObjectId(id)})
                .then(items => this.languageSpecific(items, this.lang));;
        });
    }

    getByIdArray(collection, id) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName)
            const idArray = id
                .slice(0)
                .filter((id) => MongoDB.ObjectId.isValid(id))
                .map((id) => MongoDB.ObjectId(id));
            return db
                .collection(collection)
                .find({"_id": {$in: idArray}})
                .toArray().then(items => this.languageSpecific(items, this.lang));;
        });
    }

    getAmount(amount, collection) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName);
            return db
                .collection(collection)
                .find({})
                .limit(Number(amount))
                .toArray().then(items => this.languageSpecific(items, this.lang));;
        });
    }
    
    insertOne(collection, objToInsert) {
        return this.dbConnection.then(client => {
            const db = client.db(this.dbName)
            return db
                .collection(collection)
                .insertOne(objToInsert);
        });
    }
};

