import React, { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";

const UpdateProfile = ()=>{
    const nameRef = useRef();
    const urlRef = useRef();
    const authCtx = useContext(AuthContext);

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
                    deleteAttribute: ["DISPLAY_NAME", "PHOTO_URL"],
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            console.log(data);
            if(!res.ok){
                throw new Error("Something went wrong while updating");
            }
        }catch(error){
            console.log(error);
        }
    }
    return(
        <React.Fragment>
            <header style={{display : "flex", justifyContent: "space-between"}}>
                <h1>
                    Winners never quite, Quitters never win.
                </h1>
                <p>Your Profile is 64% completed. A complete Profile has higher chances of landing a job.  <Link to="/update">Complete now</Link></p>
                <hr />
            </header>
            <section>
                <div>
                    <div>
                        <h2>Contact Details</h2>
                        <button type="button">Cancel</button>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="name">Full Name: </label>
                            <input type="text" id="name" ref={nameRef} />
                        </div>
                        <div>
                            <label htmlFor="url">Profile Photo URL: </label>
                            <input type="text" id="url" ref={urlRef} />
                        </div>
                        <button type="submit" onClick={updateProfileHandler}>Update</button>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default UpdateProfile;