export default function ContactItem({ contact, onDelete }) {
  return (
    <div className="item">
      <div className="meta">
        <strong>{contact.name}</strong>
        <small>{contact.email}</small>
        {contact.phone && <small>{contact.phone}</small>}
      </div>
      <button onClick={() => onDelete(contact.id)} aria-label={`Delete ${contact.name}`}>
        Delete
      </button>
    </div>
  );
}
