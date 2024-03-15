import { Router } from "express";
import { client } from "../../../client/client.prisma";
import { verifyToken } from "../../../middlewares/jwt.middleware";
import { decryptData, encryptData } from "../../../services/encryptService";
import { generateJWT } from "../../../services/jwtService";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const { email, password, name, username } = req.body;

  try {
    const encryptedPassword = await encryptData(password);
    const newUser = await client.user.create({
      data: {
        email,
        name,
        password: encryptedPassword,
        username,
      },
    });

    return res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const validatePassword = await decryptData({
      password,
      storedPassword: user.password,
    });
    if (!validatePassword) {
      throw new Error("Senha incorreta");
    }
    const token = generateJWT(user.id);
    const loggedUser = await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        jwt_token: token,
      },
    });

    return res.status(200).json({
      user: {
        name: loggedUser.name,
        email: loggedUser.email,
      },
      auth: {
        token: loggedUser.jwt_token,
      },
    });
  } catch (err: any) {
    return res.status(401).json({ err: err.message });
  }
});

authRouter.post("/signout", verifyToken, async (req, res) => {
  const userId = req.userId;
  console.log(userId);

  try {
    await client.user.update({
      where: {
        id: userId,
      },
      data: {
        jwt_token: null,
      },
    });
    return res.status(200).send("Logged out");
  } catch (err: any) {
    return res.status(400).json({ err: err.message });
  }
});

export { authRouter };

