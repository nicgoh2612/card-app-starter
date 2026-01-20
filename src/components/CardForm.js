export default function CardForm({
  values,
  onChange,
  onSubmit,
  busy,
  error,
  submitText,
}) {
  return (
    <form className="card-form" onSubmit={onSubmit}>
      <div className="form-field">
        <label htmlFor="card_name">Card Name</label>
        <input
          id="card_name"
          name="card_name"
          type="text"
          value={values.card_name || ""}
          onChange={onChange}
          disabled={busy}
          required
          placeholder="e.g. Lightning Bolt"
        />
      </div>

      <div className="form-field">
        <label htmlFor="card_pic">Card Image URL</label>
        <input
          id="card_pic"
          name="card_pic"
          type="url"
          value={values.card_pic || ""}
          onChange={onChange}
          disabled={busy}
          required
          placeholder="https://..."
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? "Please wait..." : submitText}
        </button>
      </div>
    </form>
  );
}
