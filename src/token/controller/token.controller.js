const Token = require('../model/token');

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
            code:
            validFrom,
            validTo,
            allowMultipleScan: allowMultipleScan ?? false,
            UserId: req.userId
        });
        res.status(201).json(token);
    } catch (err) {
        console.log(`Error while generating token : ${err}`);
        res.status(500).json({error: 'Failed to create task'});
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