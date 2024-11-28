document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    console.log('Form submitted:', { name, phone, email });

    try {
        const response = await fetch('http://localhost:5000/new-contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, email })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const newContact = await response.json();
        console.log('New contact added:', newContact);

        addContactToTable(newContact);

        // Clear the form
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error('Error adding contact:', error);
    }
});

async function loadContacts() {
    try {
        const response = await fetch('http://localhost:5000/contacts');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const contacts = await response.json();
        console.log('Contacts loaded:', contacts);
        contacts.forEach(addContactToTable);
    } catch (error) {
        console.error('Error loading contacts:', error);
    }
}

function addContactToTable(contact) {
    const contactList = document.getElementById('contactList');
    const row = document.createElement('tr');
    row.dataset.id = contact._id;
    row.innerHTML = `
        <td contenteditable="true">${contact.name}</td>
        <td contenteditable="true">${contact.phone}</td>
        <td contenteditable="true">${contact.email}</td>
        <td>
            <button onclick="saveContact(this)">Save</button>
            <button onclick="deleteContact(this)">Delete</button>
        </td>
    `;
    contactList.appendChild(row);
}

async function saveContact(button) {
    const row = button.parentElement.parentElement;
    const id = row.dataset.id;
    const name = row.cells[0].innerText;
    const phone = row.cells[1].innerText;
    const email = row.cells[2].innerText;

    try {
        const response = await fetch(`http://localhost:5000/api/contacts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, email })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        button.innerText = 'Saved';
        setTimeout(() => {
            button.innerText = 'Save';
        }, 2000);
    } catch (error) {
        console.error('Error saving contact:', error);
    }
}

async function deleteContact(button) {
    const row = button.parentElement.parentElement;
    const id = row.dataset.id;

    try {
        await fetch(`http://localhost:5000/api/contacts/${id}`, {
            method: 'DELETE'
        });

        row.remove();
    } catch (error) {
        console.error('Error deleting contact:', error);
    }
}

loadContacts();
