import  express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("API is running...");
});

export default app;