import React, {  createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from '../Firebase/firebase_config';
export const AuthContext = createContext()
const auth = getAuth(app);
const AuthProvider = ({children}) => {
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)

const createUser = (email, password) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth,email,password);
}

const signInUser = (email, password) => {
    setLoading(true)
    signInWithEmailAndPassword(email,password)
}

const logOut = () => {
    setLoading(true)
    return signOut(auth)
}

useEffect(()=>{
const  unSubscribe = onAuthStateChanged(auth, currentUser =>{
    setUser(currentUser)
    // console.log("current User:", currentUser)
    setLoading(false)

});
return () => {
    unSubscribe()
}
},[])

const userInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logOut
}
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;