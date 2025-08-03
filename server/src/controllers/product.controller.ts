import { Request, Response } from "express";

const handleResponse = (res: Response, success: boolean, message: string, data: any = null) => {};

const createProduct = async (req: Request, res: Response) => {
	try {
		const { name, description, price, currency, categoryName, type, features = [], images = [] } = req.body;
	} catch (error) {}
};
