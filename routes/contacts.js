var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const contactsRepo = require("../src/contactsFileRepository");



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
  body("contactEmail")
    .trim()
    .custom((value, { req }) => {
      if (!value || value.trim() === "") {
        // Skip email validation if value is empty
        return true;
      }
      // Proceed with email validation
      return value;
    })
    .isEmail()
    .withMessage("Email must be a valid email address"),
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
router.post("/:uuid/edit", function (req, res, next) {
  if (req.body.contactFirstName.trim() === "") {
    const contact = contactsRepo.findById(req.params.uuid);
    res.render("contacts_edit", {
      title: "Edit this Contact",
      msg: "Contact first name cannot be empty!",
      contact: contact,
    });
  } else if (req.body.contactLastName.trim() === "") {
    const contact = contactsRepo.findById(req.params.uuid);
    res.render("contacts_edit", {
      title: "Edit this Contact",
      msg: "Contact last name cannot be empty!",
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
