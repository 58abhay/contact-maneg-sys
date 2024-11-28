const express = require('express');
const { getContacts, createContact, updateContact, deleteContact } = require('../controllers/contactController');
const router = express.Router();

router.get('/contacts', getContacts);
router.post('/new-contact', createContact);
router.put('/contacts/:id', updateContact);
router.delete('/del-contact/:id', deleteContact);

module.exports = router;