const loki = require('lokijs');
const dbFile = require('./seed.json');
const collectionName = 'couriers';

const dbLoader = () => {
    if(!db.getCollection(collectionName)) {
        const coll = db.addCollection(collectionName, {disableMeta: true, unique: ['id']});
        coll.insert(dbFile);
    }
}

const db = new loki('src/db/couriers.db', {
    autoload: true,
    autoloadCallback: dbLoader,
    autosave: 'true',
    autosaveInterval: 4000
});

module.exports = db;
