import React, {
	useRef,
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from "react";

const OtpInputBox = forwardRef(
	(
		{
			length = 6,
			onComplete,
			autoFocus = true,
			containerStyle = {},
			inputStyle = {},
		},
		ref
	) => {
		const [code, setCode] = useState(Array(length).fill(""));
		const inputsRef = useRef([]);

		const handleChange = (e, idx) => {
			const val = e.target.value.replace(/[^0-9]/g, "");
			if (!val) return;
			const newCode = [...code];
			newCode[idx] = val;
			setCode(newCode);
			if (idx < length - 1 && val) {
				inputsRef.current[idx + 1].focus();
			}
		};

		const handleKeyDown = (e, idx) => {
			if (e.key === "Backspace") {
				if (code[idx]) {
					const newCode = [...code];
					newCode[idx] = "";
					setCode(newCode);
				} else if (idx > 0) {
					inputsRef.current[idx - 1].focus();
				}
			}
		};

		const handlePaste = (e) => {
			const paste = e.clipboardData.getData("text").replace(/\D/g, "");
			if (paste.length === length) {
				setCode(paste.split(""));
				inputsRef.current[length - 1].focus();
			}
		};

		useEffect(() => {
			if (autoFocus && inputsRef.current[0]) {
				inputsRef.current[0].focus();
			}
		}, [autoFocus]);

		useEffect(() => {
			const allFilled = code.every((digit) => digit !== "");
			if (allFilled) {
				onComplete(code.join(""));
			}
			// eslint-disable-next-line
		}, [code]);

		useImperativeHandle(ref, () => ({
			resetOtp: () => {
				setCode(Array(length).fill(""));
				if (inputsRef.current[0]) {
					inputsRef.current[0].focus();
				}
			},
		}));

		return (
			<div style={{ display: "flex", ...containerStyle }}>
				{Array.from({ length }).map((_, idx) => (
					<div
						key={idx}
						style={{
							display: "flex",
							alignItems: "center",
						
						}}
					>
						<input
							ref={(el) => (inputsRef.current[idx] = el)}
							aria-label={`Digit ${idx + 1}`}
							autoComplete="off"
							type="tel"
							maxLength="1"
							value={code[idx]}
							onChange={(e) => handleChange(e, idx)}
							onKeyDown={(e) => handleKeyDown(e, idx)}
							onPaste={handlePaste}
							onFocus={(e) => e.target.select()}
							style={{
								textAlign: "center",
								width: "1em",
							}}
						/>
					</div>
				))}
			</div>
		);
	}
);

export default OtpInputBox;
