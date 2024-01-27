import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;
const jwt_expiry_date = process.env.JWT_EXPIRY_DATE;

const createJwtToken = (user) => {
    return jwt.sign(user, jwt_secret, {
        expiresIn: jwt_expiry_date,
    });
};

export { createJwtToken };