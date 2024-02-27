const path = require('node:path');
const betterSqlite3 = require('better-sqlite3');

const db = new betterSqlite3(path.join(__dirname,'../data/contacts.sqlite'), { verbose: console.log }); //verbose is an optional parameter. everytime SQLite does something log it to the console
const createStmt = db.prepare("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)");
createStmt.run();

const repo = {
    findAll: () => Array.from(db.values()),
    create: (contact) => {
        // const newContact = {
        //     id: crypto.randomUUID(),
        //     firstName: contact.firstName,
        //     lastName: contact.lastName,
        //     email: contact.email,
        //     notes: contact.notes,
        //     date: new Date().toLocaleDateString('en-us')
        // };
        // db.set(newContact.id, newContact);
        // saveData();
    },
    findById: (uuid) => db.get(uuid),
    deleteById: (uuid) => {
        // db.delete(uuid);
        // saveData();
    },
    update: (contact) => {
        // db.set(contact.id, contact);
        // saveData();
    },
};

module.exports = repo;