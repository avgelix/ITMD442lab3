var express = require('express');
var router = express.Router();
const { body, validationResult } = require("express-validator");
const contactsRepo = require("../src/contactsFileRepository");

/* GET contacts page. */
router.get('/', function(req, res, next) {
  const data = contactsRepo.findAll();
  res.render('contacts', { title: 'Your Contacts', contacts: data });
});


/* GET contacts add. */
router.get('/add', function(req, res, next) {
  res.render('contacts_add', { title: 'Add a contact' });
});

module.exports = router;
