import ContactItem from "./ContactItem.jsx";

export default function ContactList({ contacts, query, onDelete }) {
  if (!contacts.length && !query) {
    return <div className="empty">No contacts yet. Add one to the list</div>;
  }
  if (!contacts.length && query) {
    return <div className="empty">No contact in this info “{query}”.</div>;
  }
  return (
    <div className="grid">
      {contacts.map((c) => (
        <ContactItem key={c.id} contact={c} onDelete={onDelete} />
      ))}
    </div>
  );
}
