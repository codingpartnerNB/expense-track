import { Link, useNavigate } from "react-router-dom";
import styles from './Home.module.css';
import React from "react";
import { useSelector } from "react-redux";

const Home = ()=>{
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const varifyMailHandler = async(event)=>{
        event.preventDefault();
        try{
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCFNkfAZd3AxFad0tQUmqaOC6iCl9eNS7s",{
                method: "POST",
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: token
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            console.log(data);
            if(!res.ok){
                throw new Error('Failed to verify email');
            }
        }catch(error){
            console.log(error);
        }
    }

    const addExpensesHandler = ()=>{
        navigate('/expenses');
    }
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
                <button className={styles.action} onClick={varifyMailHandler}>Varify Email</button>
                <button className={styles.action} onClick={addExpensesHandler}>Add Expenses</button>
            </main>
        </React.Fragment>
    );
}

export default Home;