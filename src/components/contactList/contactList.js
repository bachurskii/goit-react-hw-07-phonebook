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
    phone: '',
  });
  const [filter, setFilter] = useState('');
  const [nameNotUnique, setNameNotUnique] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const isContactNameUnique = (contacts, newName) => {
    const lowerCaseNewName = newName.toLowerCase();
    return contacts.every(
      contact => contact.name.toLowerCase() !== lowerCaseNewName
    );
  };

  const handleAddContact = event => {
    event.preventDefault();

    const lowerCaseNewName = newContact.name.toLowerCase();

    if (!isContactNameUnique(contacts, lowerCaseNewName)) {
      setNameNotUnique(true);
      return;
    }

    dispatch(addContact(newContact));
    setNewContact(prevState => ({
      ...prevState,
      name: '',
      phone: '',
    }));

    setNameNotUnique(false);
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
      <form onSubmit={handleAddContact}>
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={e =>
            setNewContact(prevState => ({ ...prevState, name: e.target.value }))
          }
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={newContact.phone}
          onChange={e =>
            setNewContact(prevState => ({
              ...prevState,
              phone: e.target.value,
            }))
          }
        />
        <button type="submit">Add Contact</button>
      </form>

      {nameNotUnique && (
        <p style={{ color: 'red' }}>
          This name is already taken. Please choose a unique name.
        </p>
      )}

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
