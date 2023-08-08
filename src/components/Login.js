import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Login User.
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/v1/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (response.status === 200) {
                const { token } = await response.json();
                localStorage.setItem('AuthToken', token);
                navigate('/');
                window.location.reload();
            } else {
                alert("Invalid Credentials");
            }
        } catch (error) {
            alert('Internal Server Error');
        }
    };

    return (
        <div className="flex justify-center py-10 bg-slate-200">
            <form className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg" onSubmit={handleLogin}>
                <h2 className="text-2xl font-semibold text-center mb-4">Sign In to your account</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required minLength={6} />
                </div>
                <button type="submit" role="button" className="w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 font-semibold">Sign In</button>
                <p className="text-blue-500 text-center text-sm font-normal hover:text-blue-600">Don't have an account? <Link to='/register' className="text-blue-600 font-semibold hover:text-blue-700"> Sign Up</Link></p>
            </form>
        </div>
    );
};

export default Login;