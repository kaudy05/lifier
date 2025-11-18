import { db } from './sqlite';

export type Habit = {
  id: number;
  nome: string;
  horario?: string | null;
};

export async function createHabit(nome: string, horario?: string | null, userId?: number | null) {
  try {
    if ((db as any).runAsync) {
      const res = await (db as any).runAsync('INSERT INTO habits (nome, horario, user_id) VALUES (?, ?, ?);', [nome, horario ?? null, userId ?? null]);
      console.log('createHabit runAsync result:', res);
      return true;
    }

    // alternativa
    const safeHorario = horario != null ? `'${String(horario).replace("'","''")}'` : 'NULL';
    const safeUser = userId != null ? `${Number(userId)}` : 'NULL';
    const res = await (db as any).execAsync(`INSERT INTO habits (nome, horario, user_id) VALUES ('${nome.replace("'","''" )}', ${safeHorario}, ${safeUser});`);
    console.log('createHabit execAsync result:', res);
    return true;
  } catch (error) {
    console.log('Erro ao criar hábito:', error);
    return false;
  }
}

export async function getHabits(userId?: number | null): Promise<Habit[]> {
  try {
    if ((db as any).getAllAsync) {
      const rows = await (db as any).getAllAsync('SELECT id, nome, horario FROM habits WHERE user_id = ? ORDER BY id DESC;', [userId ?? null]);
      console.log('getHabits getAllAsync rows:', rows);
      return rows as Habit[];
    }

    if ((db as any).execAsync) {
      const res = await (db as any).execAsync('SELECT id, nome, horario FROM habits WHERE user_id = ' + (userId != null ? Number(userId) : 'NULL') + ' ORDER BY id DESC;');
      console.log('getHabits execAsync raw:', res);
      if (res == null) {
        console.log('getHabits: execAsync returned null — returning empty list');
        return [];
      }
      // tenta normalizar formatos de retorno comuns
      // caso 1: res é um array de linhas
      if (Array.isArray(res)) {
        // algumas bibliotecas retornam [{ id: 1, nome: 'x', horario: null }, ...]
        if (res.length && typeof res[0] === 'object' && 'nome' in res[0]) return res as Habit[];
      }
      // caso 2: res.rows ou res[0].rows
      if ((res as any).rows) {
        const r = (res as any).rows;
        if (r._array) return r._array as Habit[];
        if (Array.isArray(r)) return r as Habit[];
      }
      // caso 3: res.results -> rows
      if ((res as any).results && Array.isArray((res as any).results) && (res as any).results[0]?.rows) {
        const r = (res as any).results[0].rows;
        if (r._array) return r._array as Habit[];
        if (Array.isArray(r)) return r as Habit[];
      }

      return [];
    }

    return [];
  } catch (error) {
    console.log('Erro ao buscar hábitos:', error);
    return [];
  }
}

export async function updateHabit(id: number, nome: string, horario?: string | null, userId?: number | null) {
  try {
    if ((db as any).runAsync) {
      await (db as any).runAsync('UPDATE habits SET nome = ?, horario = ? WHERE id = ? AND user_id = ?;', [nome, horario ?? null, id, userId ?? null]);
      return true;
    }

    const safeHorario = horario != null ? `'${String(horario).replace("'","''")}'` : 'NULL';
    await (db as any).execAsync(`UPDATE habits SET nome = '${nome.replace("'","''")}', horario = ${safeHorario} WHERE id = ${id} AND user_id = ${userId != null ? Number(userId) : 'NULL'};`);
    return true;
  } catch (error) {
    console.log('Erro ao atualizar hábito:', error);
    return false;
  }
}

export async function deleteHabit(id: number, userId?: number | null) {
  try {
    if ((db as any).runAsync) {
      await (db as any).runAsync('DELETE FROM habits WHERE id = ? AND user_id = ?;', [id, userId ?? null]);
      return true;
    }

    await (db as any).execAsync(`DELETE FROM habits WHERE id = ${id} AND user_id = ${userId != null ? Number(userId) : 'NULL'};`);
    return true;
  } catch (error) {
    console.log('Erro ao deletar hábito:', error);
    return false;
  }
}
