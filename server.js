const jsonServer = require('json-server');
const auth = require('json-server-auth')
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

const rules = auth.rewriter({
    "/patients": "/patients?_embed=records",
    "/patients/:id": "/patients/:id?_embed=records",
    "/records": "/records?_expand=patient",
    "/records/:patient": "/records?patientId=:patient&_expand=patient"
})

server.db = router.db;



server.use(middlewares);
server.use(rules)
server.use(auth)
server.use(router);

server.listen(port);