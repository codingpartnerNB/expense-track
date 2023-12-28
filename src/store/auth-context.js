import React, { useState } from "react"

const AuthContext = React.createContext({
    token: "",
    getToken : (token)=>{}
});

export const AuthContextProvider = (props)=>{
    const [token, setToken] = useState("");
    const getTokenHandler = (token)=>{
        setToken(token);
    }
    const data = {
        token : token,
        getToken: getTokenHandler
    }
    return <AuthContext.Provider value={data}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;