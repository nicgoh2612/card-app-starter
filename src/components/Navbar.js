import { useNavigate, NavLink } from "react-router-dom";


export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  
  return (
    <nav className="navbar">
      <div className="nav-brand">Card App</div>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Home
        </NavLink>
        <NavLink to="/cards" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Cards
        </NavLink>
        <NavLink to="/cards/new" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Add Card
        </NavLink>
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink to="/login">Login</NavLink>)}
      </div>
    </nav>
  );
}
