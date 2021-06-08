const UserHandler = require('./handler');
const userRoutes = require('./routes');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const userHandler = new UserHandler(service, validator);
    server.route(userRoutes(userHandler));
  },
};