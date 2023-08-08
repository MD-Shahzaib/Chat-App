import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProfilePage = () => {

    const navigate = useNavigate();
    const { user } = useContext(UserContext)
    const [editMode, setEditMode] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [firstName, setFirstName] = useState(user.name);
    const [lastName, setLastName] = useState('Akhter');
    const [username, setUsername] = useState(user.name + 'Akhter');
    const [phone, setPhone] = useState('123-456-7890');
    const [profession, setProfession] = useState('Software Developer');

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        setEditMode(false);
    };

    return (
        <div className="bg-slate-900 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto bg-slate-800 shadow-md rounded-md">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                            <svg onClick={() => { navigate('/') }} className="w-7 h-7 hover:bg-slate-700 rounded-full p-1 cursor-pointer mt-0.5" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#ffffff" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
                            <span>Profile</span>
                        </h2>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-600 text-white"
                                value={email}
                                readOnly={!editMode}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex mb-4">
                            <div className="w-1/2 mr-2">
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-600 text-white"
                                    value={firstName}
                                    readOnly={!editMode}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="w-1/2 ml-2">
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-600 text-white"
                                    value={lastName}
                                    readOnly={!editMode}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-500 mb-1">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-600 text-white"
                                value={username}
                                readOnly={!editMode}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-600 text-white"
                                value={phone}
                                readOnly={!editMode}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="profession" className="block text-sm font-medium text-gray-500 mb-1">Profession</label>
                            <input
                                type="text"
                                id="profession"
                                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-600 text-white"
                                value={profession}
                                readOnly={!editMode}
                                onChange={(e) => setProfession(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={editMode ? handleSave : handleEdit}
                            >
                                {editMode ? "Save" : "Edit"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;