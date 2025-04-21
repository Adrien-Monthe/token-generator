const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../../user/model/user');

const Token = sequelize.define('Token', {
    code: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    validFrom: {
        type: DataTypes.DATE
    },
    validTo: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    allowMultipleScans: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    scanCount: {
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: true
});

Token.belongsTo(User);
User.hasMany(Token);

module.exports = Token;