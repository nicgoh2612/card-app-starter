import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home">
      <h1>Card Management App</h1>

      <p>
        Welcome to the Card Management App. This application allows you to
        view, add, edit, and delete cards stored in the system.
      </p>

      <p>
        Use the navigation menu or click the button below to get started.
      </p>

      <Link to="/cards" className="primary-button">
        View Cards
      </Link>
    </main>
  );
}
