import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

function generateJWT(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
}

function validateJWT(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string)
}

function decodeJWT (token: string) {
  return jwt.decode(token)
}

export { generateJWT, validateJWT, decodeJWT };
