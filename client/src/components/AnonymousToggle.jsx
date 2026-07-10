export default function AnonymousToggle({ addContact, onToggle, name, onNameChange, contact, onContactChange }) {
  return (
    <div className="anonymous-toggle">
      <div className="toggle-row">
        <div className="toggle-copy">
          <p className="toggle-title">Add your name &amp; contact</p>
          <p className="toggle-sub">Optional — your feedback stays anonymous otherwise</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={addContact}
          className={`switch${addContact ? ' on' : ''}`}
          onClick={() => onToggle(!addContact)}
        >
          <span className="switch-knob" />
        </button>
      </div>

      {addContact && (
        <div className="contact-fields">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email or phone"
            value={contact}
            onChange={(e) => onContactChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
