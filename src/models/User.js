import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'Email should be unique'],
        match: [/[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/],
        minLength: [10, 'Email should be at least 10 characters long!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        match: [/^[a-zA-Z0-9]+$/],
        minLength: [6, 'Password should be at least 6 characters'], 
    }
});

// userSchema.pre('validate', async function() {
//     if (this.isNew) {
//         // const userExists = await model('User').exists({email: this.email});
//         const userExists = await this.constructor.exists({email: this.email});
//         if (userExists) {
//             throw new Error('User already exists!');
//         }
//     }
// });

userSchema.pre('save', async function () {
    // Generate salt
    // const salt = await bcrypt.genSalt(12);
    
    this.password = await bcrypt.hash(this.password, 13);
});

const User = model('User', userSchema);

export default User;
