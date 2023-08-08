import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ userName, userEmail, logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <div className="relative inline-block text-left z-10">
            <button type="button" onClick={toggleMenu} className="inline-flex items-center bg-slate-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 text-white rounded text-base">
                <span className='font-medium'>{userName}</span>
                <svg className="w-4 h-4 ml-0.5 mt-0.5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-slate-700 text-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div role="menuitem" className="block px-4 py-2 text-sm hover:bg-slate-600  border-b cursor-pointer">
                            <span>Signed in as</span><br />
                            <span className='font-medium'>{userEmail}</span>
                        </div>
                        <Link to="/profile" role="menuitem" className="block px-4 py-2 text-sm hover:bg-slate-600 ">Your profile</Link>
                        <div onClick={logout} role="menuitem" className="block px-4 py-2 text-sm font-medium hover:bg-slate-600  cursor-pointer border-t">Sign out</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
