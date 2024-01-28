import { GraphQLString } from 'graphql';
import { userType, postType, commentType, userInputType  } from './types.js';
import User from '../models/User.js';
import { createJwtToken } from '../utils/auth.js';

const register = {
    type: userType,
    args: {
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString },
    },
    async resolve(parent, args) {
        const { userName, email, password, displayName } = args.input;
        const user = new User({ userName, email, password, displayName });

        try {
        const savedUser = await user.save();
        const token = createJwtToken(savedUser);
        return savedUser;
        } catch (error) {
        console.error("Error saving user:", error);
        throw new Error("Failed to register user");
        }
    },
};

export { register };