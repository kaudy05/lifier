import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("app.db");

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
  } catch (error) {
    console.log("Erro ao criar tabelas:", error);
  }
}
