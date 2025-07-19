import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
	const { token } = req.cookies;

	if (!token) {
		res.status(401).json({
			success: false,
			message: "Not authorized! Sign in again",
		});
		return;
	}

	try {
		const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

		if (decodedToken.id) {
			(req as any).userId = decodedToken.id;
		} else {
			res.status(401).json({
				success: false,
				message: "Not authorized! Sign in again",
			});

			return;
		}

		next();
	} catch (error: any) {
		res.status(401).json({ success: false, message: error.message });
	}
};

export default userAuth;
