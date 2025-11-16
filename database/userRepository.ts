import { db } from "../database/sqlite";
import { User } from "../src/User";


export async function createUser(nome: string, email: string, senha: string) {
  await db.runAsync(
    "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senha]
  );
}


export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await db.getFirstAsync<User>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return user ?? null;
}


export async function getUser(email: string, senha: string): Promise<User | null> {
  try {
    const user = await db.getFirstAsync<User>(
      "SELECT * FROM users WHERE email = ? AND senha = ?",
      [email, senha]
    );

    return user ?? null;
  } catch (error) {
    console.log("Erro ao buscar usuário:", error);
    return null;
  }
}
