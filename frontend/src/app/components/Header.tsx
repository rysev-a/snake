import { Link } from 'inferno-router';

const Header = () => (
  <div className="container">
    <nav className="navbar-menu">
      <Link to="/" className="navbar-item">
        Home
      </Link>
      <Link to="/game" className="navbar-item">
        Game
      </Link>
    </nav>
  </div>
);

export default Header;
