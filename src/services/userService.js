import bcrypt from 'bcrypt';

import User from "../models/User.js"

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
    }
}
