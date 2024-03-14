import { config } from "dotenv";
import { app } from "./server/server";
config();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 💫💫`);
  console.log(`check it out: http://localhost:${PORT}`);
});
