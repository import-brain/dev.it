// import apollo, graphQL, mongoose, pull MongoDB connection URL from config file
const { ApolloServer } = require('apollo-server');
const graphql = require('graphql-tag');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');
const Post = require('./models/Post');

const typeDefs = graphql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query{
        getPosts: [Post]
    }
`;
// definitions
const resolvers = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find();
                return posts;
            } catch (err){
                throw new Error(err);
            }
        }
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