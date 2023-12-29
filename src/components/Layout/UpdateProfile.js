import React, { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import { Link, useNavigate } from "react-router-dom";
import styles from './UpdateProfile.module.css';

const UpdateProfile = ()=>{
    const nameRef = useRef();
    const urlRef = useRef();
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const updateProfileHandler = async(event)=>{
        event.preventDefault();
        const enteredName = nameRef.current.value;
        const enteredUrl = urlRef.current.value;
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCFNkfAZd3AxFad0tQUmqaOC6iCl9eNS7s";
        try{
            const res = await fetch(url,{
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCtx.token,
                    displayName: enteredName,
                    photoUrl: enteredUrl,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            const response = await fetch("https://expense-track-ddb59-default-rtdb.firebaseio.com/userDetail.json",{
                method: "POST",
                body: JSON.stringify({
                    name: data.displayName,
                    photoUrl:data.photoUrl
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(!response.ok){
                throw new Error("Something went wrong while storing data to database!");
            }
            authCtx.getToken(data.idToken);
            console.log(data);
            if(!res.ok){
                throw new Error("Something went wrong while updating!");
            }
        }catch(error){
            console.log(error);
        }
    }

    const editUserDataHandler = ()=>{
        navigate('/edit');
    }

    const cancelHandler = ()=>{
        navigate('/home');
    }

    return(
        <React.Fragment>
            <header>
                <div className={styles.head}>
                    <h1>
                        Winners never quite, Quitters never win.
                    </h1>
                    <p style={{backgroundColor: "pink", borderRadius: "8px", padding: "5px 10px",width: "35%"}}>Your Profile is 64% completed. A complete Profile has higher chances of landing a job.  <Link to="/update">Complete now</Link></p>
                </div>
                <hr />
            </header>
            <section className={styles.main}>
                <div className={styles.headbox}>
                    <h2>Contact Details</h2>
                    <button type="button" onClick={cancelHandler} className={styles.cancel}>Cancel</button>
                </div>
                <form>
                    <div className={styles.control}>
                        <label htmlFor="name">Full Name: </label>
                        <input type="text" id="name" ref={nameRef} />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="url">Profile Photo URL: </label>
                        <input type="text" id="url" ref={urlRef} />
                    </div>
                    <button type="button" className={styles.action} onClick={editUserDataHandler}>Edit</button>
                    <button type="submit" className={styles.action} onClick={updateProfileHandler}>Update</button>
                </form>
            </section>
        </React.Fragment>
    );
}

export default UpdateProfile;