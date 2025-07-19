import { type FormEvent, type KeyboardEvent, type ClipboardEvent, useEffect, type MutableRefObject } from "react";
import { Input } from "../components/ui/input";

interface InputOtpProps {
	inputRefs: MutableRefObject<(HTMLInputElement | null)[]>;
	verifyOtpCode?: (otp: string) => void;
}

const InputOtp = ({ inputRefs, verifyOtpCode }: InputOtpProps) => {
	const checkAndSubmitOtp = () => {
		const otp = inputRefs.current.map((e) => e?.value || "").join("");

		if (otp.length === 6 && !/\s/.test(otp)) {
			if (verifyOtpCode) {
				verifyOtpCode(otp);
			}
		}
	};

	const handleInput = (e: FormEvent<HTMLInputElement>, index: number) => {
		const value = e.currentTarget.value;

		if (!/^\d*$/.test(value)) {
			e.currentTarget.value = "";
			return;
		}

		if (value.length > 0 && index < inputRefs.current.length - 1) {
			inputRefs.current[index + 1]?.focus();
		}

		setTimeout(() => {
			checkAndSubmitOtp();
		}, 0);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === "Backspace" && index > 0 && e.currentTarget.value === "") {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
		e.preventDefault();
		const paste = e.clipboardData.getData("text");
		const pastedArray = paste.replace(/\D/g, "").split("").slice(0, 6);

		inputRefs.current.forEach((input) => {
			if (input) input.value = "";
		});

		pastedArray.forEach((char, index) => {
			if (inputRefs.current[index]) {
				inputRefs.current[index].value = char;
			}
		});

		const lastFilledIndex = Math.min(pastedArray.length - 1, 5);
		if (inputRefs.current[lastFilledIndex]) {
			inputRefs.current[lastFilledIndex].focus();
		}

		// Use setTimeout to ensure values are updated before checking
		setTimeout(() => {
			checkAndSubmitOtp();
		}, 0);
	};

	useEffect(() => {
		inputRefs.current[0]?.focus();
	}, []);
	return (
		<div className="flex justify-between gap-2" onPaste={handlePaste}>
			{Array(6)
				.fill(0)
				.map((_, index) => (
					<Input
						key={index}
						required
						className="h-12 w-12"
						maxLength={1}
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						ref={(e) => {
							inputRefs.current[index] = e;
						}}
						onInput={(e) => handleInput(e, index)}
						onKeyDown={(e) => handleKeyDown(e, index)}
					/>
				))}
		</div>
	);
};

export default InputOtp;
