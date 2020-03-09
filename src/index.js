const {GraphQLServer} = require('graphql-yoga');
const data = require('./data.json')

const resolvers = {
    Query: {
        datas: (obj, args, context, info) => {
            return data;
        },
    },
};

const server = new GraphQLServer(
    {
        typeDefs: './src/data.graphql',
        resolvers,
    }
);
server.start(() => console.log(`Server is running on http://localhost:4000`));
