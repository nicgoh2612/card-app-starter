import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardForm from "../components/CardForm";
import { getCards, updateCard } from "../services/api";

export default function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    card_name: "",
    card_pic: "",
  });

  const [loading, setLoading] = useState(true); // page loading existing card
  const [busy, setBusy] = useState(false);       // submitting update
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCard() {
      setLoading(true);
      setError("");

      try {
        const data = await getCards();

        // If your backend returns { cards: [...] } instead of an array,
        // this will handle both.
        const list = Array.isArray(data) ? data : (data.cards || data.data || []);

        const found = list.find((c) => String(c.id) === String(id));

        if (!found) {
          throw new Error("Card not found.");
        }

        if (!cancelled) {
          setValues({
            card_name: found.card_name ?? "",
            card_pic: found.card_pic ?? "",
          });
        }
      } catch (err) {
        if (!cancelled) setError(err?.message || "Failed to load card.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCard();
    return () => {
      cancelled = true;
    };
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      await updateCard(id, values);
      navigate("/cards");
    } catch (err) {
      setError(err?.message || "Failed to update card. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <main style={{ maxWidth: 520, margin: "0 auto", padding: 16 }}>
        <p>Loading card...</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 520, margin: "0 auto", padding: 16 }}>
      <h1>Edit Card</h1>
      <p>Update the details below and save your changes.</p>

      <CardForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        busy={busy}
        error={error}
        submitText="Update Card"
      />
    </main>
  );
}
