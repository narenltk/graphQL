import { GraphQLList } from 'graphql';
import { userType, postType, commentType } from './types.js';
// import { postType, commentType, userInputType  } from './types.js';
import User from '../models/User.js';

const users = {
    type: new GraphQLList(userType),
    // type: new GraphQLList(userInputType),
    resolve (parent, args) {
        return User.find()
    },
};

export { users }; 