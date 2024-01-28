import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import { schema } from './graphql/schema.js';
import { connectDB } from './db/index.js';
import dotenv from 'dotenv';
import { createJwtToken } from './utils/auth.js';
import { authenticate } from './middleware/auth.js';


dotenv.config();
const port = process.env.PORT;
const app = express();
connectDB();

// app.use(authenticate);

app.get("/", (req, res) => {
    console.log("Verified User");
    res.json({ msg: "Hello World" });
});

app.get('/authtest', (req, res) => {
    res.json(createJwtToken({
        username: process.env.USERNAME,
        email: process.env.EMAIL,
        displayName: process.env.DISPLAYNAME,
        password: process.env.PASSWORD,
        admin: process.env.ADMIN,
    }));
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development', // gives the actuall graphQL playground
}));

app.use(authenticate);

app.listen(port, () => {
    console.log('App running on PORT ' + port);
});