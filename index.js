// import apollo, graphQL, mongoose, pull MongoDB connection URL from config file
const { ApolloServer } = require('apollo-server');
const graphql = require('graphql-tag');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');

const typeDefs = graphql`
    type Query{
        sayHi: String!
    }
`;
// definitions
const resolvers = {
    Query: {
        sayHi: () => 'Hello World!'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});
// MongoDB connection code
mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB database connection successful');
        return server.listen({ port: 5000 });
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    });