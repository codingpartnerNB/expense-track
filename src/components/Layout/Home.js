import { Link } from "react-router-dom";
import styles from './Home.module.css';
import React from "react";

const Home = ()=>{
    return(
        <React.Fragment>
            <header>
                <div className={styles.head}>
                    <h1>
                        Welcome to Expense Tracky!!!
                    </h1>
                    <p>Your profile is Incomplete. <Link to="/update">Complete now</Link></p>
                </div>
                <hr />
            </header>
            <main className={styles.main}>
                <h2>Good Morning</h2>
            </main>
        </React.Fragment>
    );
}

export default Home;