import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Section from './Section/Section';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notification/Notification';
import { useEffect, useState } from 'react';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const contactObj = {
      name,
      number,
      id: nanoid(),
    };
    setContacts(prev => [...prev, contactObj]);
  };
  const getFilterContacts = () => {
    return (
      contacts &&
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  const deleteContact = id => {
    setContacts(contacts.filter(el => el.id !== id));
  };

  const filterContacts = getFilterContacts();
  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>
      <Section title="Contacts">
        {contacts.length > 0 ? (
          <>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
              contacts={filterContacts}
              deleteContact={deleteContact}
            />
          </>
        ) : (
          <Notification message="There is no added contacts" />
        )}
      </Section>
    </>
  );
};

export default App;
