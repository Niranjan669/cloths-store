const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // make sure db.json is in server/
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`JSON Server running on port ${port}`);
});
