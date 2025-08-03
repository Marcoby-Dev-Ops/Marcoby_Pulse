import express, { Express } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoute from "./routes/admin.route";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";

const app: Express = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true }));

app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}`);
});
