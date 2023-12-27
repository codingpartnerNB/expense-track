import styles from './Header.module.css';

const Header = ()=>{
    return(
        <header className={styles.head}>
            <h1>ExpenseTracker</h1>
            <nav className={styles.nav}>
                <ul>
                    <li>Home</li>
                    <li>Products</li>
                    <li>About Us</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;