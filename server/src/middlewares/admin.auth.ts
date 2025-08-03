import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { token } = req.headers;
		if (!token) {
			return res.json({
				success: false,
				message: "Not authorized! Log in again",
			});
		}

		const decodedToken = jwt.verify(token as string, process.env.SECRET_KEY!);
		const adminCredentials = process.env.ADMIN_EMAIL! + process.env.ADMIN_PASSWORD!;

		if (decodedToken !== adminCredentials) {
			return res.json({
				success: false,
				message: "Not authorized! Log in again",
			});
		}

		next();
	} catch (error: any) {
		return res.json({
			success: false,
			message: error.message,
		});
	}
};

export default adminAuth;
