const Contact = require('../models/contactModel');

const getContacts = async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
};

const createContact = async (req, res) => {
    const { name, phone, email } = req.body;
    const newContact = new Contact.create({ name, phone, email });
    await newContact.save();
    res.json(newContact);
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, phone, email } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(id, { name, phone, email }, { new: true });
    res.json(updatedContact);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.json({ message: 'Contact deleted' });
};

module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact
};
