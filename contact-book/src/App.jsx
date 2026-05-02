import { useMemo, useState } from "react";
import "./styles.css";
import ContactForm from "./components/ContactForm.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ContactList from "./components/ContactList.jsx";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");

  const addContact = (c) =>
    setContacts((prev) => [...prev, { ...c, id: Date.now().toString() }]);

  const deleteContact = (id) =>
    setContacts((prev) => prev.filter((c) => c.id !== id));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }, [contacts, query]);

  return (
    <div className="container">
      <h1>Contact Book</h1>

      <div className="grid">
        <div className="card">
          <h2>Add Contact</h2>
          <ContactForm onAdd={addContact} />
        </div>
        <div className="card">
          <h2>Search</h2>
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Contacts</h2>
        <ContactList contacts={filtered} query={query} onDelete={deleteContact} />
      </div>
    </div>
  );
}
