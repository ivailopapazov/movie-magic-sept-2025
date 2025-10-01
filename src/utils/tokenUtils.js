import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/constants.js';

export function generateAuthToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

    return token;
}
