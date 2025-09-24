import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Cast name is required!'],
    },
    age: {
        type: Number,
        required: [true, 'Cast age is requried!'],
        max: 120,
        min: 0,
    },
    born: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});

const Cast = model('Cast', castSchema);

export default Cast;
