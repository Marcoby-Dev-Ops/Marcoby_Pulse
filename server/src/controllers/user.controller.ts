import { Request, Response } from "express";
import { getUserById } from "../models/user.model";

const getUserData = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).userId;
		const user = await getUserById(userId);

		if (!user) {
			res.json({
				success: false,
				message: "User does not exist",
			});
			return;
		}

		res.json({
			success: true,
			data: { user },
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export { getUserData };
