const express = require('express');
const router = express.Router();
const Users = require('../models/ChatUser'); //
const verifyToken = require('../middleware/verifyToken');

// Get-Users (Endpoint: "http://localhost:4000/api/v1/users" using "GET".
router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json({ message: "Success", data: users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    };
});

// Get-User-Profile (Endpoint: "http://localhost:4000/api/v1/users/profile" using "GET" (auth) Required).
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const { _id } = req.decoded
        const userData = await Users.findById(_id).select("-password -tokens");
        res.status(200).json({ message: "Success", data: userData });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error });
    }
});

// Register-User (Endpoint: "http://localhost:4000/api/v1/users/register" using "POST" (no-auth) Required).
router.post('/register', async (req, res) => {
    try {
        const data = req.body;
        const user = new Users(data);
        await user.save();
        res.status(201).json({ message: 'Success', data });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});

// Login-User (Endpoint: "http://localhost:4000/api/v1/users/login" using "POST" (no-auth) Required).
router.post('/login', async (req, res) => {
    try {
        const data = req.body;
        // 1- Check Is User-Email-Exist.
        const userExist = await Users.findOne({ email: data.email });
        if (!userExist) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        // 2- Check Is User-Password-Correct.
        const isPwdCorrect = userExist.comparePassword(data.password);
        if (!isPwdCorrect) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        // 3- Generate-Token.
        const token = await userExist.generateToken();
        return res.status(200).json({ message: "Success", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});

// Update-User (Endpoint: "http://localhost:4000/api/v1/users/:id" using "PUT" (auth) Required).
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const _id = req.params.id;
        const data = req.body;
        await Users.findByIdAndUpdate(_id, data)
        res.status(200).json({ message: 'Success', id: _id, data });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
})

// Delete-User (Endpoint: "http://localhost:4000/api/v1/users/:id" using "DELETE" (auth) Required).
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const _id = req.params.id;
        await Users.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Success', id: _id });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
})

module.exports = router;