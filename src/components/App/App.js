import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import Section from "../Section";
import Filter from "../Filter";
import ContactForm from "../ContactForm";
import ContactList from "../ContactList";

import "./App.scss";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (contacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  addContact = (newName, newNumber) => {
    const findContact = this.state.contacts.find(
      ({ name, number }) => name === newName || number === newNumber
    );

    if (findContact) {
      alert(`${newName} is already in contacts`);
      return;
    }

    const id = uuidv4();

    this.setState(({ contacts }) => ({
      contacts: [{ id: id, name: newName, number: newNumber }, ...contacts],
    }));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  changeFilter = (e) => {
    const value = e.currentTarget.value;
    this.setState({ filter: value });
  };

  render() {
    const { contacts, filter } = this.state;
    const findContactsInputId = uuidv4();

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <Section>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>

        <Filter
          value={filter}
          onChange={this.changeFilter}
          id={findContactsInputId}
        />

        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </Section>
    );
  }
}

export default App;
