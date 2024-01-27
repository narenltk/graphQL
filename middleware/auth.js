import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
        console.log(" token is missing or invalid format...");
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authorizationHeader.split(' ')[1];

    try {
        const verified = jwt.verify(token, jwt_secret);
        req.verifiedUser = verified;
        console.log("verification success...!!!", verified);
        next();
    } catch (err) {
        console.log("verification failed ");
        console.log("verification catch block error: ", err);
        next();
    }

};

export { authenticate };