import { useState } from "react";

const isEmail = (e) => /\S+@\S+\.\S+/.test(e);

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [touched, setTouched] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const nameOK = form.name.trim().length > 0;
    const emailOK = isEmail(form.email);
    if (nameOK && emailOK) {
      onAdd({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });
      setForm({ name: "", email: "", phone: "" });
      setTouched({});
    } else {
      setTouched((t) => ({ ...t, name: true, email: true }));
    }
  };

  const nameBad = touched.name && !form.name.trim();
  const emailBad = touched.email && !isEmail(form.email);

  return (
    <form onSubmit={submit} className="grid" noValidate>
      <div>
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          className={nameBad ? "bad" : ""}
          placeholder="John Doe"
          required
        />
        {nameBad && <div className="help">Name is required.</div>}
      </div>

      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          className={emailBad ? "bad" : ""}
          placeholder="John@example.com"
          required
        />
        {emailBad && <div className="help">Enter a valid email.</div>}
      </div>

      <div>
        <label>Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="(optional)"
        />
      </div>

      <button type="submit">Add Contact</button>
    </form>
  );
}
