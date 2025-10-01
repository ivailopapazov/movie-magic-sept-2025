import bcrypt from 'bcrypt';

import User from "../models/User.js"
import { generateAuthToken } from '../utils/tokenUtils.js';

export default {
    async register(userData) {
        const user = await User.create(userData);

        const token = generateAuthToken(user);

        return token;
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
        const token = generateAuthToken(user);

        return token;
    }
}
