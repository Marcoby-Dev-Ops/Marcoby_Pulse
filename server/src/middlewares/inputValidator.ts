import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const userSchema = Joi.object({
	firstName: Joi.string().min(3).required(),
	lastName: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	confirmPassword: Joi.string().required(),
	phoneNumber: Joi.string().min(10).required(),
	DOB: Joi.string().required(),
	gender: Joi.string(),
	companyName: Joi.string(),
	agreeToTerms: Joi.boolean(),
});

const loginUserSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

const validateUser = (req: Request, res: Response, next: NextFunction): void => {
	try {
		const { error, value } = userSchema.validate(req.body, { convert: true });

		if (error) {
			res.status(400).json({
				status: 400,
				message: error.details[0].message,
				field: error.details[0].path[0],
			});
			return;
		}
		req.body = value;

		next();
	} catch (err) {
		next(err);
	}
};

const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
	try {
		const { error, value } = loginUserSchema.validate(req.body);

		if (error) {
			res.status(400).json({
				status: 400,
				message: error.details[0].message,
				field: error.details[0].path[0],
			});
			return;
		}
		req.body = value;
		next();
	} catch (error: any) {
		next(error);
	}
};

export { validateUser, validateLogin };
