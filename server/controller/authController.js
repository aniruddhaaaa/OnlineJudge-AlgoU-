const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authenticateToken = require('../middleware/authenticateToken');
const cors = require('cors');

const router = express.Router();

router.post('/register', async(req, res) =>{
    try{
        const{username, email, password} = req.body;
        console.log('Request body: ', req.body);

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message : 'Email already exists. Try to login or use another email id.'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password : hashedPassword
        });

        await user.save();

        res.status(201).json({message : 'Regristration successfull'});
        } catch(error){
            console.error(error);
            res.status(500).json({message : 'Server Error'});
        }
});

router.post('/login', async(req, res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: 'Invalid email id' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Please enter the correct password' });
        }

        const payload = {
            user : {
                id : user.id
            }
        };

        jwt.sign(payload, process.env.SECRET_KEY, {expiresIn : '1h'}, (err, token) =>{
            if(err) throw err;
            res.json({ token });
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({message : 'Server error'});
    }
});

router.get('/')

module.exports = router;
