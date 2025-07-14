import { FastifyInstance } from 'fastify';
import {
  criarDisciplina,
  listarDisciplinas,
  listarDisciplinaPorId,
  atualizarDisciplina,
  deletarDisciplina
} from '../services/disciplinaService';

interface DisciplinaBody {
  nome: string;
  descricao?: string;
  carga_horaria: number;
  departamento_id?: number;
}

export async function disciplinaRoutes(app: FastifyInstance) {
  app.post('/disciplinas', async (req, reply) => {
    try {
      const body = req.body as DisciplinaBody;
      if (!body.nome || !body.carga_horaria) {
        reply.code(400).send({ erro: 'Nome e carga horária são obrigatórios' });
        return;
      }
      const nova = await criarDisciplina(body);
      reply.code(201).send(nova);
    } catch (err) {
      reply.code(500).send({ erro: 'Erro ao criar disciplina' });
    }
  });

  app.get('/disciplinas', async (req, reply) => {
    try {
      const { filtro } = req.query as { filtro?: string };
      const [rows] = await listarDisciplinas(filtro);
      reply.send(rows);
    } catch (err) {
      reply.code(500).send({ erro: 'Erro ao listar disciplinas' });
    }
  });

  app.get('/disciplinas/:id', async (req, reply) => {
    try {
      const { id } = req.params as { id: string };
      const [rows] = await listarDisciplinaPorId(Number(id));
      if (!rows) {
        reply.code(404).send({ erro: 'Disciplina não encontrada' });
        return;
      }
      reply.send(rows);
    } catch (err) {
      reply.code(500).send({ erro: 'Erro ao buscar disciplina' });
    }
  });

  app.put('/disciplinas/:id', async (req, reply) => {
    try {
      const { id } = req.params as { id: string };
      const body = req.body as DisciplinaBody;
      
      // Verifica se a disciplina existe
      const [existing] = await listarDisciplinaPorId(Number(id));
      if (!existing) {
        reply.code(404).send({ erro: 'Disciplina não encontrada' });
        return;
      }

      if (!body.nome || !body.carga_horaria) {
        reply.code(400).send({ erro: 'Nome e carga horária são obrigatórios' });
        return;
      }

      const atualizada = await atualizarDisciplina(Number(id), body);
      reply.send(atualizada);
    } catch (err) {
      reply.code(500).send({ erro: 'Erro ao atualizar disciplina' });
    }
  });

  app.delete('/disciplinas/:id', async (req, reply) => {
    try {
      const { id } = req.params as { id: string };
      
      // Verifica se a disciplina existe
      const [existing] = await listarDisciplinaPorId(Number(id));
      if (!existing) {
        reply.code(404).send({ erro: 'Disciplina não encontrada' });
        return;
      }

      const deletada = await deletarDisciplina(Number(id));
      reply.send(deletada);
    } catch (err) {
      reply.code(500).send({ erro: 'Erro ao deletar disciplina' });
    }
  });
}