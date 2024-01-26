import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";
export const AuthContext = createContext(null)
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)


    const SochailLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)

    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)


    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)

    }
    const updateUserProfile = (photo, name) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('currentUser', currentUser)

            //jwt set and get 

            if (currentUser) {
                axios.post('https://resturent-server-seven.vercel.app/jwt', { email: currentUser.email, })
                    .then(data => {
                        localStorage.setItem("access-token", data.data.token)
                        setLoading(false)
                    }

                    )
            }
            else {
                localStorage.removeItem("access-token")
            }

        })
        return () => {
            return unSubscribe()
        }
    }, [])


    const authInfo = {
        user,
        loading,
        updateUserProfile,
        SochailLogin,
        createUser,
        signIn,
        logOut
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;