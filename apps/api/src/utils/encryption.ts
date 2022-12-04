// hash password function

import { hash, genSalt, compare } from 'bcrypt'

export const hashPassword = async (text: string): Promise<string> => {
  const salt = await genSalt(10)
  return await hash(text, salt)
}

export const comparePassword = async (
  text: string,
  hash: string,
): Promise<boolean> => {
  return await compare(text, hash)
}
