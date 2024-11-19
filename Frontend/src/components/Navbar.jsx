import { Link } from 'react-router-dom';
import styles from '../estilos/Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/eventos">Eventos</Link></li>
        <li><Link to="/reservas">Reservas</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

