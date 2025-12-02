import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
    origin: [
    "http://localhost:5173",
    "https://auth-frontend-puce-six.vercel.app"
    ],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({ message: "Auth API working 🎉" });
});

export default app;
