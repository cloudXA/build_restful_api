const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserController = require('../controllers/user');
const { route } = require('./products');

router.post('/signup', UserController.user_signup)

router.post('/login', UserController.user_login)

router.delete('/:userId', UserController.user_delete) 

router.get('/:userId', UserController.user)

router.post('/userAddReply', UserController.user_add_reply)

router.post('/userCallback', UserController.user_reply_callback)

module.exports = router;