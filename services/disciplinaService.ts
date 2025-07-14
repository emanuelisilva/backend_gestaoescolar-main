import { db } from '../db';

export interface Disciplina {
  id?: number;
  nome: string;
  descricao?: string;
  carga_horaria: number;
  departamento_id?: number;
}

export async function criarDisciplina(disciplina: Disciplina) {
  const [result] = await db.execute(
    `INSERT INTO disciplinas (nome, descricao, carga_horaria, departamento_id)
     VALUES (?, ?, ?, ?)`,
    [disciplina.nome, disciplina.descricao, disciplina.carga_horaria, disciplina.departamento_id]
  );
  return result;
}

export async function listarDisciplinas(filtro?: string) {
  let query = `
    SELECT d.id, d.nome, d.descricao, d.carga_horaria, dep.nome as departamento
    FROM disciplinas d
    LEFT JOIN departamentos dep ON d.departamento_id = dep.id
  `;
  if (filtro) {
    query += ` WHERE d.nome LIKE ?`;
    return db.query(query, [`%${filtro}%`]);
  }
  return db.query(query);
}

export async function listarDisciplinaPorId(id: number) {
  const query = `
    SELECT d.id, d.nome, d.descricao, d.carga_horaria, d.departamento_id, dep.nome as departamento
    FROM disciplinas d
    LEFT JOIN departamentos dep ON d.departamento_id = dep.id
    WHERE d.id = ?
  `;
  return db.query(query, [id]);
}

export async function atualizarDisciplina(id: number, dados: Disciplina) {
  return db.execute(
    `UPDATE disciplinas SET nome=?, descricao=?, carga_horaria=?, departamento_id=? WHERE id=?`,
    [dados.nome, dados.descricao, dados.carga_horaria, dados.departamento_id, id]
  );
}

export async function deletarDisciplina(id: number) {
  return db.execute(`DELETE FROM disciplinas WHERE id = ?`, [id]);
}