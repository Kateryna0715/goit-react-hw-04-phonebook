import { useState } from 'react';
import CSS from './index.module.css';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    addContact({ name, number });
    e.target.reset();
  };

  const handleChange = ({ target: { value, name } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      default:
        setNumber(value);
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={CSS.formContainer}>
        <label htmlFor="inputName" className={CSS.formLabel}>
          Name
        </label>
        <input
          name="name"
          type="text"
          className={CSS.input}
          id="inputName"
          onChange={handleChange}
          required
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        />
        <label htmlFor="inputNumber" className={CSS.formLabel}>
          Number
        </label>
        <input
          name="number"
          type="tel"
          className={CSS.input}
          id="inputNumber"
          onChange={handleChange}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          required
        />
        <button type="submit" className={CSS.btn}>
          Add contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
