import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Button from "../components/Button";
import Change from "../components/Change";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"




const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            if (!email || !username || !password) {

                return;
            }
            else {
                const registerUser = await createUserWithEmailAndPassword(auth, email, password);
                const userRef = doc(db, "users", registerUser.user.uid);
                await setDoc(userRef, { email, username, created_at: serverTimestamp() });

                //console.log(registerUser);
            }
        } catch (error) {
            console.error(error)

        }

    }
    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12'>
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm">
                <Heading headingText="Create Account" text="Join our community today!" />
                <div className="space-y-6">
                    <Input type="email"
                        placeholder="Email address"
                        value={email}
                        setValue={setEmail} />
                    <Input type="text"
                        placeholder="Enter Username"
                        value={username}
                        setValue={setUsername} />
                    <Input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        setValue={setPassword}
                    />
                    <Button text='Create Account' onClick={handleRegister} />
                    <Change
                        text="Already have a account?"
                        link="/login"
                        linkText="Sign In"
                    />
                </div>
            </div>
        </div>
    )
}

export default Register