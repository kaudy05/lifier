import * as SQLite from "expo-sqlite";

// ...existing code...
export const db = SQLite.openDatabaseSync("app_v3.db"); // NOVO BANCO

export async function createTables() {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS habits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        horario TEXT,
        user_id INTEGER
      );
    `);

    // tenta adicionar as colunas `horario` e `user_id` caso não existam (ALTER falhará se já estiverem presentes)
    try {
      await db.execAsync(`ALTER TABLE habits ADD COLUMN horario TEXT;`);
    } catch (e) {
      // ignorar se a coluna já existe ou se ALTER não for suportado
    }
    try {
      await db.execAsync(`ALTER TABLE habits ADD COLUMN user_id INTEGER;`);
    } catch (e) {
      // ignorar
    }
  } catch (error) {
    console.log("Erro ao criar tabelas:", error);
  }
}
// ...existing code...