import express from "express";
import cors from 'cors'
import { authRouter } from "./routes/auth/auth.routes";
const app = express();

app.use(express.json());
app.use(cors())

app.use('/auth', authRouter)
export { app };
