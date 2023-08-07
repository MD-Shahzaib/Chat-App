import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Your login logic here

        // For simplicity, we'll just display the username in the console for now
        console.log('Logged in as:', username);
        console.log('Signed up as:', username);

        // Reset form fields after submission
        setUsername('');
        setPassword('');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 shadow-md rounded-lg px-8 py-10 w-1/2"
            >
                <h2 className="text-3xl text-white font-bold mb-8">Login</h2>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="bg-gray-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </div>
                <p className="text-white mt-4">
                    Don't have an account? <Link to="/register" className="text-blue-400">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;