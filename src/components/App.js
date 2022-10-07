  
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import   "./App.css";
import Header from "./Header";
import AddContact from "./addContact";
import ContactList from "./contactList";


  function App(){
    const LOCAL_STORAGE_KEY = "contacts";
    const [contacts, setContacts] = useState(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
      );
      const addContactHandler = (contact) => {
        console.log(contact);
        setContacts([...contacts, { id: uuid(), ...contact }]);
      };
    
      const removeContactHandler = (id) => {
        const newContactList = contacts.filter((contact) => {
          return contact.id !== id;
        });
    
        setContacts(newContactList);
      };
    
      // useEffect(() => {
      //   const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      //   if (retriveContacts) setContacts(retriveContacts);
      // }, []);
    
      useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
      }, [contacts]);

    return (
        <div>
            <Router>
            <Header/>
            <AddContact addContactHandler={addContactHandler}/>
            <ContactList contacts={contacts} getContactId={removeContactHandler}/>
            </Router>
        </div>
    )
    
  }

  export default App;