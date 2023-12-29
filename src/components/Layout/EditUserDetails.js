import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import styles from './EditUserDetails.module.css';

const EditUserDetails = ()=>{
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    const nameChangeHandler = (event)=>{
        setName(event.target.value);
    }

    const urlChangeHandler = (event)=>{
        setUrl(event.target.value);
    }

    const fetchUserData = async()=>{
        try{
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCFNkfAZd3AxFad0tQUmqaOC6iCl9eNS7s",{
                method: "POST",
                body: JSON.stringify({
                    idToken: authCtx.token                    
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            console.log(data);
            if(!response.ok){
                throw new Error("Something went wrong while getting data!");
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(fetchUserData, []);

    const editUserDetailsHandler = async(event)=>{
        event.preventDefault();
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCFNkfAZd3AxFad0tQUmqaOC6iCl9eNS7s";
        try{
            const response = await fetch(url,{
                method: "POST",
                body: JSON.stringify({
                    idToken: authCtx.token,
                    displayName: name,
                    photoUrl: url,
                    returnSecureToken: true                   
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            authCtx.getToken(data.idToken);
            if(!response.ok){
                throw new Error("Something went wrong while getting data!");
            }
        }catch(error){
            console.log(error);
        }
    }

    const cancelHandler = ()=>{
        navigate('/update');
    }
    return(
        <React.Fragment>
            <header>
                <div className={styles.head}>
                    <h1>
                        Winners never quite, Quitters never win.
                    </h1>
                </div>
                <hr />
            </header>
            <section className={styles.main}>
                <div className={styles.headbox}>
                    <h2>Edit User Details</h2>
                    <button type="button" onClick={cancelHandler} className={styles.cancel}>Cancel</button>
                </div>
                <form>
                    <div className={styles.control}>
                        <label htmlFor="name">Full Name: </label>
                        <input type="text" id="name" onChange={nameChangeHandler} value={name} />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="url">Profile Photo URL: </label>
                        <input type="text" id="url" onChange={urlChangeHandler} value={url} />
                    </div>
                    <button type="submit" className={styles.action} onClick={editUserDetailsHandler}>Edit</button>
                </form>
            </section>
        </React.Fragment>
    );
}

export default EditUserDetails;