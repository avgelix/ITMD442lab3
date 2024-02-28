var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const contactsRepo = require("../src/contactsSQLiteRepository");



/* GET contacts page. */
router.get("/", function (req, res, next) {
  const data = contactsRepo.findAll();
  res.render("contacts", { title: "Your Contacts", contacts: data });
});

/* GET contacts add. */
router.get("/add", function (req, res, next) {
  res.render("contacts_add", { title: "Add a contact" });
});

/* POST contacts add. */
router.post(
  "/add",
  body("contactFirstName")
    .trim()
    .notEmpty()
    .withMessage("contact first name cannot be empty"),
  body("contactLastName")
    .trim()
    .notEmpty()
    .withMessage("contact last name cannot be empty"),
  body('contactEmail')
    .optional({ nullable: true, checkFalsy: true }) // Make the field optional and allow empty strings
    .trim()
    .isEmail().withMessage('Invalid email address'),
  body("contactNotes").trim(),
  function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      /*if there is an error in the result*/
      res.render("contacts_add", {
        title: "Add a contact",
        msg: result.array(),
      });
    } else {
      console.log("yay");
      contactsRepo.create({
        firstName: req.body.contactFirstName,
        lastName: req.body.contactLastName,
        email: req.body.contactEmail,
        notes: req.body.contactNotes,
      });
      res.redirect("/contacts");
    }
  }
);


/* GET contact view. */
router.get("/:uuid", function (req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  if (contact) {
    res.render("contact_view", { title: "Contact Details", contact: contact });
    console.log(contact);
  } else {
    redirect.redirect("/contacts");
  }
});

/* GET contact edit. */
router.get("/:uuid/edit", function (req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  if (contact) {
    res.render("contacts_edit", { title: "Edit This Contact", contact: contact });
  } else {
    redirect.redirect("/contacts");
  }
});

/* POST contacts edit. */
router.post("/:uuid/edit",
    body("contactFirstName")
    .trim()
    .notEmpty()
    .withMessage("contact first name cannot be empty"),
    body("contactLastName")
    .trim()
    .notEmpty()
    .withMessage("contact last name cannot be empty"),
    body('contactEmail')
    .optional({ nullable: true, checkFalsy: true }) // Make the field optional and allow empty strings
    .trim()
    .isEmail().withMessage('Invalid email address'),
    function (req, res, next) {
      const result = validationResult(req);
      const contact = contactsRepo.findById(req.params.uuid);
      if (!result.isEmpty()) {
        console.log(result.array());
        /*if there is an error in the result*/
        res.render("contacts_edit", {
          title: "Edit this Contact",
          msg: result.array(),
          contact: contact,
        });
    } else {
    const updatedContact = {
      id: req.params.uuid,
      firstName: req.body.contactFirstName.trim(),
      lastName: req.body.contactLastName.trim(),
      email: req.body.contactEmail.trim(),
      notes: req.body.contactNotes.trim(),
      date: new Date().toLocaleDateString('en-us')
    };
    contactsRepo.update(updatedContact);
    res.redirect("/contacts");
  }
});


/* GET contact delete. */
router.get("/:uuid/delete", function (req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  if (contact) {
    res.render("contacts_delete", { title: "Delete This Contact", contact: contact });
  } else {
    redirect.redirect("/contacts");
  }
});

/* POST contact delete. */
router.post("/:uuid/delete", function (req, res, next) {
  contactsRepo.deleteById(req.params.uuid);
  res.redirect("/contacts");
});



module.exports = router;
