import { db } from "./sqlite";
import * as Crypto from "expo-crypto";

export type User = {
  id: number;
  nome: string;
  email: string;
  senha: string;
};

export async function createUser(nome: string, email: string, senha: string) {
  const senhaHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    senha
  );

  await db.runAsync(
    "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senhaHash]
  );

  return true;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await db.getFirstAsync(
    "SELECT id, nome, email, senha FROM users WHERE email = ?",
    [email]
  );

  if (!result) return null;

  return result as User;
}
