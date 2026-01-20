import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null); // which card is being deleted
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    try {
      const data = await getCards();
      const list = Array.isArray(data) ? data : (data.data || data.cards || []);
      setCards(list);
    } catch (err) {
      console.error("Failed to load cards", err);
      setError(err?.message || "Failed to load cards");
      setCards([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(card) {
    setBusyId(card.id);
    setError("");

    try {
      await deleteCard(card.id);
      setCards((prev) => prev.filter((c) => c.id !== card.id));
    } catch (err) {
      console.error("Failed to delete card", err);
      setError(err?.message || "Failed to delete card");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="cards-page">
      <h1>Cards</h1>

      {loading && <p>Loading cards...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && cards.length === 0 && <p>No cards found.</p>}

      {!loading && cards.length > 0 && (
        <div className="cards-grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onDelete={handleDelete}
              busy={busyId === card.id}
            />
          ))}
        </div>
      )}
    </main>
  );
}
