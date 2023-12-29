import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ()=>{
    return(
        <header className={styles.head}>
            <h1>ExpenseTracky</h1>
            <nav className={styles.nav}>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/'>Login</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;