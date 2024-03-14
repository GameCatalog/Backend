import { hash } from "bcrypt";

async function encryptData(password: string) {
  return await hash(password, 10);
}


export { encryptData }
