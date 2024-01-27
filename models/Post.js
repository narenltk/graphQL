import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Post = mongoose.model('post', postSchema);
export default Post ;