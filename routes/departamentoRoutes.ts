import { FastifyInstance } from 'fastify';
import { db } from '../db';

export async function departamentoRoutes(app: FastifyInstance) {
  app.get('/departamentos', async (req, reply) => {
    try {
      const [rows] = await db.query('SELECT * FROM departamentos');
      reply.send(rows);
    } catch (err) {
      reply.code(500).send({ erro: 'Erro ao listar departamentos' });
    }
  });
}