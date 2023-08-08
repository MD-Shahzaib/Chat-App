import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch("http://localhost:4000/api/v1/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            if (response.status === 201) {
                navigate('/login')
            } else {
                alert("Registration failed, try again Later");
            }
            // Reset form fields after submission
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            alert("Internal Server Error");
        }
    };

    return (
        <div className="bg-slate-200">
            <div className="flex justify-center items-center py-10 min-h-screen">
                <form
                    className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg"
                    onSubmit={handleRegister}
                >
                    <h2 className="text-2xl font-semibold text-center mb-4">Create an account</h2>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required minLength={6} />
                    </div>
                    <button type="submit" role="button" className="w-full px-4 py-2 mb-4 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign Up</button>
                    <p className="text-blue-500 text-center text-sm font-normal hover:text-blue-600">Already have an account? <Link to='/login' className="text-blue-600 font-semibold hover:text-blue-700"> Sign In</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Register;