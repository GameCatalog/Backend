import { Router } from "express";
import { client } from "../../../client/client.prisma";
import { encryptData } from "../../../services/encryptService";

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

export { authRouter }
