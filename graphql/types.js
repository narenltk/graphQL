import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInputObjectType } from 'graphql';
import { User, Post, Comment } from '../models/index.js';

const userType = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: () => ({
        id: { type: GraphQLID },
        userName: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        displayName: { type: GraphQLString },
    }),
});

const userInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    description: 'User input type for registration',
    fields: () => ({
        id: { type: GraphQLID },
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString },
    }),
});


const postType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post type',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        author: { 
            type: userType,
            resolve (parent, args) {
                return User.findById(parent.authorId)
            }
        },
        comments: {
            type: GraphQLList(commentType),
            resolve (parent, args) {
                return Comment.find({ postId: parent.id })
            }
        },
    }),
});

const commentType = new GraphQLObjectType({
    name: 'Comment',
    description: 'Comment type',
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: { 
            type: userType,
            resolve (parent, args) {
                return User.findById(parent.userId)
            } 
        },
        post: { 
            type: postType,
            resolve (parent, args) {
                return Post.findById(parent.postId)
            } 
        },
        
    }),
});

export { userType, postType, commentType, userInputType };