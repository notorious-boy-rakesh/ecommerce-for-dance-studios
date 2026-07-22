const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const dbPath = path.join(__dirname, '..', 'local_database.json');

// Initialize DB file
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({}));
}

const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

const mockMongooseLocally = () => {
    mongoose.Model.find = function(query) {
        const modelName = this.modelName;
        return {
            select: function() { return this; },
            sort: async function() {
                const db = readDB();
                let results = db[modelName] || [];
                // Simple filter based on query if exists (e.g. { role: 'student' })
                if (query) {
                    results = results.filter(item => {
                        let match = true;
                        for (let k in query) {
                            if (item[k] !== query[k]) match = false;
                        }
                        return match;
                    });
                }
                return results;
            },
            then: function(resolve) {
                const db = readDB();
                let results = db[modelName] || [];
                if (query) {
                    results = results.filter(item => {
                        let match = true;
                        for (let k in query) {
                            if (item[k] !== query[k]) match = false;
                        }
                        return match;
                    });
                }
                resolve(results);
            }
        };
    };

    mongoose.Model.create = async function(data) {
        const modelName = this.modelName;
        const db = readDB();
        if (!db[modelName]) db[modelName] = [];
        const newItem = { _id: Date.now().toString(), createdAt: new Date().toISOString(), ...data };
        db[modelName].push(newItem);
        writeDB(db);
        return newItem;
    };

    mongoose.Model.findByIdAndUpdate = async function(id, data, options) {
        const modelName = this.modelName;
        const db = readDB();
        if (!db[modelName]) return null;
        const index = db[modelName].findIndex(i => i._id === id || i._id == id);
        if (index === -1) return null;
        db[modelName][index] = { ...db[modelName][index], ...data, updatedAt: new Date().toISOString() };
        writeDB(db);
        return db[modelName][index];
    };

    mongoose.Model.findByIdAndDelete = async function(id) {
        const modelName = this.modelName;
        const db = readDB();
        if (!db[modelName]) return null;
        const index = db[modelName].findIndex(i => i._id === id || i._id == id);
        if (index === -1) return null;
        const deleted = db[modelName][index];
        db[modelName].splice(index, 1);
        writeDB(db);
        return deleted;
    };

    mongoose.Model.findOneAndUpdate = async function(query, update, options) {
        const modelName = this.modelName;
        const db = readDB();
        if (!db[modelName]) db[modelName] = [];
        let index = db[modelName].findIndex(i => {
            let match = true;
            for (let k in query) if (i[k] !== query[k]) match = false;
            return match;
        });
        if (index !== -1) {
            db[modelName][index] = { ...db[modelName][index], ...update };
            writeDB(db);
            return db[modelName][index];
        } else if (options && options.upsert) {
            const newItem = { _id: Date.now().toString(), ...query, ...update };
            db[modelName].push(newItem);
            writeDB(db);
            return newItem;
        }
        return null;
    };
};

module.exports = { mockMongooseLocally };
