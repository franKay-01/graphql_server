const ApolloServer = require('@apollo/server').ApolloServer;
const startStandaloneServer = require('@apollo/server/standalone').startStandaloneServer;
const resolvers = require('./resolvers/index.js').resolvers;
const typeDefs = require('./schema.js').typeDefs;
const getUser = require('./middleware/index')
require('dotenv').config();

const { sequelize } = require('./models');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { sequelize }
})

const context = ({req}) => {
  if (req.body.operation === 'checkOut' || req.body.operation === 'getOrders'){
    const token = req.headers.authorization?.split(' ')[1] || ''

    const user = getUser(token)

    if (!user){
      throw Error("You are not authorized")
    }
  
    return { user }
  }
  return {}
}

startStandaloneServer(server, {
  listen: { port: 4000 }, 
  context
}).then(function(serverInfo) {
  var url = serverInfo.url;
  console.log('Server ready at ' + url);
}).catch(function(error) {
  console.error('Error starting the server:', error);
});