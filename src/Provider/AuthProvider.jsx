import React, {  createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from '../Firebase/firebase_config';
import userAxiosPublic from '../hooks/userAxiosPublic';
export const AuthContext = createContext()
const auth = getAuth(app);
const AuthProvider = ({children}) => {
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)
const googleProvider = new GoogleAuthProvider()
const axiosPublic = userAxiosPublic()
const createUser = (email, password) => {
    setLoading(true)
  return  createUserWithEmailAndPassword(auth,email,password);
}

const signInUser = (email, password) => {
    setLoading(true)
  return  signInWithEmailAndPassword(auth, email,password)
}

const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
}

const logOut = () => {
    setLoading(true)
    return signOut(auth)
}

const updateUserProfile = (name, photo) =>{
 return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      })
}

useEffect(()=>{
const  unSubscribe = onAuthStateChanged(auth, currentUser =>{
    setUser(currentUser)
    if(currentUser){
        const userInfo = {email : currentUser?.email}
        axiosPublic.post("/jwt", userInfo)
        .then(res => {
            if(res.data.token){
                localStorage.setItem('access-token', res.data.token)
            }
        })
    }else{
        localStorage.removeItem('access-token')
    }
    setLoading(false)

});
return () => {
 return unSubscribe()
}
},[axiosPublic])

const userInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logOut,
    updateUserProfile,
    googleSignIn
}
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;