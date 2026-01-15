import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const useRef = doc(db, "users", currentUser.uid)
                const fetchUser = await getDoc(useRef);
                // console.log(fetchUser.data());
                setUser({ ...fetchUser.data(), id: fetchUser.id })
            }
            else {
                setUser(null);
            }
        })
        return unsubscribe;
    }, [])
    return <AuthContext.Provider value={{ user }}>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider;