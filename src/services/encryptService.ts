import { compare, hash } from "bcrypt";

async function encryptData(password: string) {
  return await hash(password, 10);
}

function decryptData({
  password,
  storedPassword,
}: {
  password: string;
  storedPassword: string;
}) {
  return compare(password, storedPassword);
}

export { decryptData, encryptData };
