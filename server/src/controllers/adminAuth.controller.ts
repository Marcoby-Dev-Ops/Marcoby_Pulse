import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const handleResponse = (res: Response, success: boolean, message: string, token?: string) => {
	return res.json({
		success,
		message,
		token,
	});
};

export const signInAdmin = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
			handleResponse(res, false, "Incorrect Admin Details");
		}

		const token = jwt.sign(email + password, process.env.SECRET_KEY!);
		return handleResponse(res, true, "Welcome Admin!", token);
	} catch (error: any) {
		handleResponse(res, false, error.message);
	}
};
