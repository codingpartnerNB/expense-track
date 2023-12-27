import { useRef, useState } from "react";
import styles from './Signup.module.css';

const Signup = ()=>{
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const cPasswordInputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async(event)=>{
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredConfPassword = cPasswordInputRef.current.value;
        if(enteredPassword !== enteredConfPassword){
            alert("Password and confirm password should be matched!");
            return;
        }

        setIsLoading(true);
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFNkfAZd3AxFad0tQUmqaOC6iCl9eNS7s";
        try{
            const res = await fetch(url,{
                method: "POST",
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setIsLoading(false);
            const data = await res.json();
            if(data && data.message){
                alert(data.idToken);
                console.log("User has successfully signed up!");
            }else{
                console.log("Signing in");
            }
            if(!res.ok){
                throw new Error("Something went wrong!");
            }
        }catch(error){
            console.log(error.message);
        }
    }
    return(
        <section className={styles.main}>
            <h1>Sign Up</h1>
            <form onSubmit={submitHandler}>
                <div className={styles.control}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" ref={emailInputRef} required />
                </div>
                <div className={styles.control}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={passwordInputRef} required />
                </div>
                <div className={styles.control}>
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" id="cpassword" ref={cPasswordInputRef} required />
                </div>
                <div className={styles.actions}>
                    {!isLoading && <button type="submit">Sign up</button>}
                    {isLoading && <p>Sending request...</p>}
                </div>
                <div className={styles.actions}>
                    <button type="button">Have an account? Login</button>
                </div>
            </form>
        </section>
    );
}

export default Signup;