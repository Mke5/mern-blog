const {Schema, model} = require('mongoose');
const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Technology', 'Health', 'Lifestyle', 'Education', 'Entertainment', 'Agriculture', 'Business', 'Sports', 'Travel', 'Food'],
        default: 'Technology',
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});
module.exports = model('Post', postSchema);