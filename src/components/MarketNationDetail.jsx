
import { imageUrl } from "./constant/accountRoles"
import React from "react";

const MarketNationDetail = ({
	index,
	name,
	metadata,
	checkBoxVisible,
	showDropdown,
	setShowDropdown,
}) => {
	const {
		JOCKEY_NAME = "",
		TRAINER_NAME = "",
		AGE = "",
		COLOURS_FILENAME = "",
		CLOTH_NUMBER = "",
		STALL_DRAW = "",
	} = metadata;

	return (
		<div className="market-nation-detail">
			{checkBoxVisible ? (
				<div className="form-check">
					<input
						type="checkbox"
						className={`form-check-input ${checkBoxVisible ? "" : "hidden"}`}
						id={`checkbox-runner-${index}`}
					/>
					<label
						htmlFor={`checkbox-runner-${index}`}
						className="form-check-label"
					>
						<div>
							{CLOTH_NUMBER} <br />({STALL_DRAW})
						</div>
						<div>
							<img
								src={
									COLOURS_FILENAME || imageUrl + "horse/" + (index + 1) + ".png"
								}
								alt="runner"
							/>
						</div>
						<div>
							<span className="market-nation-name">
								<span>
									{index + 1}. {name}
								</span>
								<span
									className="d-md-none horse-detail-arrow ms-1"
									onClick={() =>
										showDropdown === index
											? setShowDropdown(null)
											: setShowDropdown(index)
									}
								>
									<i className="fas fa-angle-down"></i>
								</span>
							</span>
							{JOCKEY_NAME && TRAINER_NAME && AGE && (
								<div className="jockey-detail hidden md:flex">
									<span className="jockey-detail-box">
										<b>Jockey:</b> <span>{JOCKEY_NAME}</span>
									</span>
									<span className="jockey-detail-box">
										<b>Trainer:</b> <span>{TRAINER_NAME}</span>
									</span>
									<span className="jockey-detail-box">
										<b>Age:</b> <span>{AGE}</span>
									</span>
								</div>
							)}
						</div>
					</label>
				</div>
			) : (
				<span className="market-nation-name d-flex align-items-start">
					<img
						src={
							COLOURS_FILENAME || imageUrl + "greyhound/" + (index + 1) + ".png"
						}
					/>
					{name.split(". ")[1]}
				</span>
			)}
		</div>
	);
};

export default MarketNationDetail;
