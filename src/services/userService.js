import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/User.js"

const JWT_SECRET = '89dasfhjo9p0s8dfupqajhashiefh3ruhiawt40dfgas9y78';

export default {
    register(userData) {
        return User.create(userData);
    },
    async login(email, password) {
        // Validate user
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid user or password!');
        }

        // Validate password
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid user or password!');
        }

        // Create token
        const payload = {
            id: user.id,
            email: user.email,
        };

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});

        return token;
    }
}
