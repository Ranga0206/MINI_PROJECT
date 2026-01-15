import React, { useState } from 'react'
import Change from '../components/Change';
import Button from '../components/Button';
import Input from '../components/Input';
import Heading from '../components/Heading';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                return;
            }
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12'>
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm">
                <Heading headingText="Welcome Back" text="Please enter your details to sign in." />
                <div className="space-y-6">
                    <Input type="email"
                        placeholder="Email address"
                        value={email}
                        setValue={setEmail} />

                    <Input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        setValue={setPassword}
                    />
                    <Button text='Sign In' onClick={handleLogin} />
                    <Change
                        text="Don't have an account yet?"
                        link="/register"
                        linkText="Create new account"
                    />
                </div>
            </div>
        </div>
    )
}

export default Login