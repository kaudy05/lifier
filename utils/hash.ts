import * as Crypto from "expo-crypto";

export async function hashPassword(password: string): Promise<string> {
  const salt = Math.random().toString(36).substring(2, 10);

  const hashed = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password + salt
  );

  return `${salt}:${hashed}`;
}

export async function comparePassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");

  const hashedAttempt = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password + salt
  );

  return hashedAttempt === hash;
}
