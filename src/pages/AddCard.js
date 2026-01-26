import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { addCard } from "../services/api";

export default function AddCard() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    card_name: "",
    card_pic: "",
  });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    }, [navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      await addCard(values);
      navigate("/cards");
    } catch (err) {
      setError(err?.message || "Failed to add card. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="page-center">
      <div className="page-header">
        <h1>Add New Card</h1>
        <p>Fill in the details below to add a new card.</p>
      </div>
  
      <CardForm 
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        busy={busy}
        error={error}
        submitText="Add Card"
      />
    </main>
  );
}
