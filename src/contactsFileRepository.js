const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const db = new Map();

/*db.set('72b77b95-b977-4196-88bd-c17da9c82f0f', {id: '72b77b95-b977-4196-88bd-c17da9c82f0f', firstName: 'Angela', lastName: 'Petrone', email: 'apetrone@hawk.iit.edu', notes:'omg', date: 'Wed Feb 02 2024 15:30:00 GMT+0000'} )
db.set('f9588057-6d0b-4da3-af8c-3c356dfc4756', {id: 'f9588057-6d0b-4da3-af8c-3c356dfc4756', firstName: 'Anna', lastName: 'Malapena', email: 'amalapena@hawk.iit.edu', notes:'', date: 'Wed Feb 02 2024 15:31:00 GMT+0000'} )*/

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname,'../data/contacts.json'));
    const contactsArray = JSON.parse(jsonData);
    contactsArray.forEach((element) => {
        db.set(element[0], element[1]);
    });
};

const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname,'../data/contacts.json'), stringifyData);
};

const repo = {
    findAll: () => Array.from(db.values()),
    create: (contact) => {
        const newContact = {
            id: crypto.randomUUID(),
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            notes: contact.notes,
            date: new Date().toLocaleDateString('en-us')
        };
        db.set(newContact.id, newContact);
        saveData();
    },
    findById: (uuid) => db.get(uuid),
    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (contact) => {
        db.set(contact.id, contact);
        saveData();
    },
};

loadData();
module.exports = repo;