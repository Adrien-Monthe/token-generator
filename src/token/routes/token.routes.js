const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/auth');
const {getAllTokens, createToken, verifyToken, verifyOwnToken} = require("../controller/token.controller");

router.get('/', authenticate, getAllTokens);
router.post('/', authenticate, createToken);
router.get('/verify/:userId', authenticate, verifyToken);
router.get('/verify-own', authenticate, verifyOwnToken);

module.exports = router;