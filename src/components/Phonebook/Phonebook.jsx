import { Component } from 'react';
import { MainTitle } from './Phonebook.styled';
import { Section } from 'components/Section';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class Phonebook extends Component {
  state = {
    contacts: [...initialContacts],
    filter: '',
  };

  handleSubmit = addedContact => {
    const isInContacts = this.state.contacts.find(
      ({ name }) => name === addedContact.name
    );
    if (isInContacts) {
      return alert(`${addedContact.name} is aready in contacts.`);
    }
    this.setState(({ contacts }) => ({
      contacts: [...contacts, addedContact],
    }));
  };

  handleChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  selectContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    const regExp = new RegExp(normalizedFilter, 'gi');
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().match(regExp)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.selectContacts();

    return (
      <>
        <MainTitle>Phonebook</MainTitle>
        <Section>
          <ContactForm onSubmit={this.handleSubmit} />
        </Section>
        <Section title="Contacts">
          <Filter onChange={this.handleChange} value={filter} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
