import Fastify from "fastify";

const app = Fastify();

app.get('/hello', () => {
  return 'Hello NLW'
});

app.listen({
  port: 3333,
}).then(() => {
  console.log('Server running in port: 3333!')
});