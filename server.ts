import Fastify from 'fastify';
import cors from '@fastify/cors';
import { disciplinaRoutes } from './routes/disciplinaRoutes';
import { departamentoRoutes } from './routes/departamentoRoutes';

const app = Fastify();
app.register(cors);
app.register(disciplinaRoutes);
app.register(departamentoRoutes);

app.listen({ port: 3000 }, () => {
  console.log('Servidor rodando em http://localhost:3000');
});