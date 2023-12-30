import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const Header = ()=>{
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const logoutHandler = ()=>{
        authCtx.logout();
        navigate('/');
    }
    return(
        <header className={styles.head}>
            <h1>ExpenseTracky</h1>
            <nav className={styles.nav}>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    {authCtx.isLoggedIn && (<button onClick={logoutHandler} className={styles.action}>Logout</button>)}
                    {!authCtx.isLoggedIn && (<li><NavLink to='/'>Login</NavLink></li>)}
                </ul>
            </nav>
        </header>
    );
}

export default Header;