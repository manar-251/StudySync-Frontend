import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../assets/images/logoForSTUDYSYNC.png";

const NavBar = ({ user, handleSignout }) => {
  return (
    <nav className={styles.container}>
      <Link to="/dashboard" className={styles.brand}>
        <img src={logo} alt="StudySync logo" className={styles.logo} />
        <span className={styles.brandText}>StudySync</span>
      </Link>

      {user ? (
        <ul className={styles.links}>
          <li><NavLink to="/dashboard" className={({isActive}) => isActive ? styles.active : undefined}>Dashboard</NavLink></li>
          <li><NavLink to="/tasks" className={({isActive}) => isActive ? styles.active : undefined}>Tasks</NavLink></li>
          <li><NavLink to="/studySessions" className={({isActive}) => isActive ? styles.active : undefined}>Study Timer</NavLink></li>
          <li><NavLink to="/wellness" className={({isActive}) => isActive ? styles.active : undefined}>Wellness</NavLink></li>
          <li><NavLink to="/profile" className={({isActive}) => isActive ? styles.active : undefined}>Profile</NavLink></li>

          <li>
            <button onClick={handleSignout} className={styles.signOut}>
              Sign Out
            </button>
          </li>
        </ul>
      ) : (
        <ul className={styles.links}>
          <li><NavLink to="/signin" className={({isActive}) => isActive ? styles.active : undefined}>Sign In</NavLink></li>
          <li><NavLink to="/signup" className={({isActive}) => isActive ? styles.active : undefined}>Sign Up</NavLink></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
