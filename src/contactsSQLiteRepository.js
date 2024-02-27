const path = require('node:path');
const betterSqlite3 = require('better-sqlite3');
const Contact = require('./Contact');

const db = new betterSqlite3(path.join(__dirname,'../data/contacts.sqlite'), { verbose: console.log }); //verbose is an optional parameter. everytime SQLite does something log it to the console
const createStmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email VARCHAR(100), notes TEXT, date DATE DEFAULT CURRENT_DATE)");
createStmt.run();

const repo = {
    findAll: () => {
        const stmt = db.prepare("SELECT * FROM contacts");
        const rows = stmt.all();
        let contacts = [];
        rows.forEach((row) => {
            const aContact = new Contact(row.id, row.firstName, row.lastName, row.email, row.notes, row.date);
            contacts.push(aContact);
        })
        return contacts;
    },
    create: (contact) => {
        const stmt = db.prepare("INSERT INTO contacts (firstName, lastName, email, notes) VALUES (?, ?, ?, ?)");
        const info = stmt.run(contact.firstName, contact.lastName, contact.email, contact.notes);
        console.log(`contact created with id: ${info.lastInsertRowid}`);
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