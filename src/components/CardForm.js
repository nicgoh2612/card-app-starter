export default function CardForm({
  values,
  onChange,
  onSubmit,
  busy,
  error,
  submitText,
}) {
  return (
    <form onSubmit={onSubmit}>
      {/* Card Name */}
      <div>
        <label htmlFor="card_name">Card Name</label>
        <input
          id="card_name"
          name="card_name"
          type="text"
          value={values.card_name || ""}
          onChange={onChange}
          disabled={busy}
          required
        />
      </div>

      {/* Card Image URL */}
      <div>
        <label htmlFor="card_pic">Card Image URL</label>
        <input
          id="card_pic"
          name="card_pic"
          type="text"
          value={values.card_pic || ""}
          onChange={onChange}
          disabled={busy}
          required
        />
      </div>

      {/* Error message */}
      {error && (
        <p style={{ color: "red", marginTop: "8px" }}>
          {error}
        </p>
      )}

      {/* Submit button */}
      <button type="submit" disabled={busy}>
        {busy ? "Please wait..." : submitText}
      </button>
    </form>
  );
}
