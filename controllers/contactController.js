const asyncHandler = require("express-async-handler");
const Contact = require("../models/cotactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  const totalRecords = contacts.length; // Get the total number of records
  res.status(200).json({
    statusCode: 200,
    message: "All Contacts Details",
    totalRecords,
    contacts,
  });
});

//@desc Create New Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body", req.body);
  const { firstname, email, lastname } = req.body;
  if (!firstname || !email || !lastname) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const contact = await Contact.create({
    firstname,
    email,
    lastname,
    user_id: req.user.id,
  });

  res.status(200).json(contact);
});

//@desc Get One Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contact);
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updateContact);
});

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }

  await contact.deleteOne();
  res.status(200).json({ message: "Contact deleted successfully!", contact });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
