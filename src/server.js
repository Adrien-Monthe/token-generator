const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const userRoutes = require('./user/routes/user.routes');
const tokenRoutes = require('./token/routes/token.routes');
dotenv.config();
const app = express();

require('./token/model/token');

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim());

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/tokens', tokenRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        await sequelize.sync({ alter: true });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
