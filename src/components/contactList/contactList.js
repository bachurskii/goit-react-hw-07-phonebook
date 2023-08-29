import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact, deleteContact } from 'redux/contactSlice';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);

  const [newContact, setNewContact] = useState({
    name: '',

    phoneNumber: '',
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = () => {
    dispatch(addContact(newContact));
    setNewContact({ name: '', phoneNumber: '' });
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.phone.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Add Contact</h2>
      <input
        type="text"
        placeholder="Name"
        value={newContact.name}
        onChange={e => setNewContact({ ...newContact, name: e.target.value })}
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={newContact.phoneNumber}
        onChange={e =>
          setNewContact({ ...newContact, phoneNumber: e.target.value })
        }
      />
      <button onClick={handleAddContact}>Add Contact</button>

      <h2>Filter Contacts</h2>
      <input
        type="text"
        placeholder="Search by Name"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            <strong>Name:</strong> {contact.name}
            <br />
            <strong>Phone:</strong> {contact.phone}
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
