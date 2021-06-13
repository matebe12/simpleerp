require('dotenv').config();
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

const port = process.env.PORT || 3000;
const app = express();

const fs = require('fs');

const cors = require('cors');
app.use(cors());

import typeDefs from './graphql/schemas.js';
const resolvers = require('./graphql/resolver.js');

const logger = require('./logger/winston');
const log = msg => logger.info(msg);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
});

server.applyMiddleware({
    app,
    path: '/graphql',
});

app.listen(port, () => {
    log(`server started on http://localhost:${port}`);
    log(`graphql test web started on http://localhost:${port}/graphql`);
});
