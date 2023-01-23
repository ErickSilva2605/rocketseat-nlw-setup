import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './lib/routes';

const app = Fastify();

app.register(cors);
app.register(appRoutes)

app.listen({
  port: 3333,
  host:"0.0.0.0"
}).then(() => {
  console.log('Server running in port: 3333!')
});
