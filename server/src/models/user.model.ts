import { Prisma, User } from "@prisma/client";
import prisma from "../utils/prisma";

const createUser = async (userData: Prisma.UserCreateInput) => {
	return await prisma.user.create({ data: userData });
};

const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email,
		},
	});
};

const getUserById = async (userId: string) => {
	return await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
};

const getUserByPhoneNo = async (phoneNumber: string) => {
	return await prisma.user.findUnique({
		where: {
			phoneNumber,
		},
	});
};

const createOtp = async (userId: string, OTP: string, expiryTime: number) => {
	const expiryTimeMinutes = Math.floor(expiryTime / (1000 * 60));
	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			verifyOtp: OTP,
			verifyOtpExpireAt: expiryTimeMinutes,
		},
	});
};

const resetOtp = async (userId: string, OTP = "", expiryTime = 0, isVerified = true) => {
	return await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			verifyOtp: OTP,
			verifyOtpExpireAt: expiryTime,
			isVerified,
		},
	});
};

const createResetPassOtp = async (email: string, resetOtp: string, resetOtpExpiryTime: number) => {
	const resetOtpExpiryTimeMinutes = resetOtpExpiryTime / (1000 * 60);
	return await prisma.user.update({
		where: {
			email,
		},
		data: {
			resetOtp,
			resetOtpExpireAt: resetOtpExpiryTimeMinutes,
		},
	});
};

const changePasswordAndReset = async (email: string, password: string, OTP = "", expiryTime = 0) => {
	return await prisma.user.update({
		where: {
			email,
		},
		data: {
			password,
			resetOtp: OTP,
			resetOtpExpireAt: expiryTime,
		},
	});
};

export {
	createUser,
	getUserByEmail,
	getUserById,
	getUserByPhoneNo,
	createOtp,
	resetOtp,
	createResetPassOtp,
	changePasswordAndReset,
};
