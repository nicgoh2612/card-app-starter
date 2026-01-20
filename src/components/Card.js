import { Link } from "react-router-dom";

export default function Card({ card, onDelete, busy }) {
  return (
    <article className="card">
      <div className="card-image">
        <img src={card.card_pic} alt={card.card_name} />
      </div>

      <div className="card-body">
        <h3 className="card-title">{card.card_name}</h3>
        <p className="card-id">ID: {card.id}</p>

        <div className="card-actions">
          <Link className="btn btn-edit" to={`/cards/${card.id}/edit`}>
            Edit
          </Link>

          <button
            className="btn btn-delete"
            onClick={() => onDelete(card)}
            disabled={busy}
            type="button"
          >
            {busy ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}
