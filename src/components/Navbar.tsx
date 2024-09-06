import { NavLink } from 'react-router-dom';
import '../styles/Generales.css';

export function Navbar() {
  return (
    <section>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'li-press' : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/checklist"
            className={({ isActive }) => (isActive ? 'li-press' : '')}
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? 'li-press' : '')}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </section>
  );
}
