import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	// host: "mail.smtp2go.com",
	// port: 2525,
	service: "gmail",
	auth: {
		user: process.env.SMTP_USER_2,
		pass: process.env.SMTP_PASS_2,
	},
});

export default transporter;
