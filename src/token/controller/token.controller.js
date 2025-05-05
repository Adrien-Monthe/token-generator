const Token = require('../model/token');
const dotenv = require('dotenv');
dotenv.config();

exports.getAllTokens = async (req, res) => {
    try {
        const tokens = await Token.findAll({where: {UserId: req.userId}});
        res.json(tokens);
    } catch (err) {
        console.log(`Error while doing getting user tokens : ${err}`);
        res.status(500).json({error: 'Failed to fetch tasks'});
    }
};

exports.createToken = async (req, res) => {
    try {
        const {validFrom, validTo, allowMultipleScan} = req.body;
        const token = await Token.create({
            code: generateToken(process.env.TOKEN_LENGTH || 10),
            validFrom,
            validTo,
            allowMultipleScan: allowMultipleScan ?? false,
            UserId: req.userId
        });
        res.status(201).json(token);
    } catch (err) {
        console.log(`Error while generating token : ${err}`);
        res.status(500).json({error: 'Failed to create token'});
    }
};

exports.verifyToken = async (req, res) => {
    try {
        const { userId } = req.params;
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({ error: 'Token code is required' });
        }

        const token = await Token.findOne({
            where: {
                UserId: userId,
                code: code
            }
        });

        if (!token) {
            return res.status(404).json({ error: 'Token not found' });
        }

        const currentDate = new Date();
        if (token.validFrom && token.validFrom > currentDate) {
            return res.status(400).json({ error: 'Token not yet valid' });
        }

        if (token.validTo && token.validTo < currentDate) {
            return res.status(400).json({ error: 'Token expired' });
        }

        if (!token.allowMultipleScans && token.scanCount > 0) {
            return res.status(400).json({ error: 'Token already scanned' });
        }

        // Update scan count
        await token.update({
            scanCount: token.scanCount + 1,
            status: true
        });

        res.json({
            message: 'Token is valid',
            token: {
                code: token.code,
                validFrom: token.validFrom,
                validTo: token.validTo,
                scanCount: token.scanCount,
                allowMultipleScans: token.allowMultipleScans,
                status: token.status
            }
        });
    } catch (err) {
        console.log(`Error while verifying token: ${err}`);
        res.status(500).json({ error: 'Failed to verify token' });
    }
};

exports.verifyOwnToken = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({ error: 'Token code is required' });
        }

        const token = await Token.findOne({
            where: {
                UserId: req.userId,
                code: code
            }
        });

        if (!token) {
            return res.status(404).json({ error: 'Token not found or does not belong to you' });
        }

        const currentDate = new Date();
        if (token.validFrom && token.validFrom > currentDate) {
            return res.status(400).json({ error: 'Token not yet valid' });
        }

        if (token.validTo && token.validTo < currentDate) {
            return res.status(400).json({ error: 'Token expired' });
        }

        if (!token.allowMultipleScans && token.scanCount > 0) {
            return res.status(400).json({ error: 'Token already scanned' });
        }

        res.json({
            message: 'Token is valid',
            token: {
                code: token.code,
                validFrom: token.validFrom,
                validTo: token.validTo,
                scanCount: token.scanCount,
                allowMultipleScans: token.allowMultipleScans,
                status: token.status
            }
        });
    } catch (err) {
        console.log(`Error while verifying own token: ${err}`);
        res.status(500).json({ error: 'Failed to verify token' });
    }
};

function generateToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}