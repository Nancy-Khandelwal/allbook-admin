import React, { useEffect, useState, useCallback } from "react";
import Icons from "../components/ui/Icon";
import useToast from "../components/hooks/useToast";
import { useUser } from "../components/contexts/UserContext";
import useApi from "../components/hooks/useApi";
import MatchBetList from "./MatchBetList";

const RightSidebar = ({
	className = "",
	betAmount,
	betData,
	setBetData,
	orders,
	refreshOrders,
	apiLoading,
	setShowSetValueModal
}) => {
	const [inputVal, setInputVal] = useState(0);
	const [stake, setStake] = useState(0);
	const [profitLoss, setProfitLoss] = useState(null);

	const { toastError, toastSuccess } = useToast();
	const { userData, verifyUser } = useUser();
	const { apiCall } = useApi();

	useEffect(() => {
		if (betData?.rate) setInputVal(betData.rate);
	}, [betData]);

	const handleIncrease = () =>
		setInputVal((prev) => parseFloat((prev + 0.01).toFixed(2)));

	const handleDecrease = () =>
		setInputVal((prev) => parseFloat(Math.max(prev - 0.01, 0).toFixed(2)));

	const handleBetAmount = (amount) => setStake((prev) => prev + amount);

	useEffect(() => {
		if (stake > 0 && betData)
			calculateProfitLoss(stake, betData.orderType, inputVal);
	}, [stake, betData, inputVal]);

	const reset = useCallback(() => {
		setInputVal(0);
		setStake(0);
		setBetData(null);
		setProfitLoss(null);
	}, [setBetData]);

	const handlePlaceOrder = async () => {
		const { selectionId, marketId, orderType, rate, runnerName, matchId } =
			betData || {};

		if (
			!selectionId ||
			!marketId ||
			!orderType ||
			!rate ||
			!runnerName ||
			!matchId ||
			stake <= 0
		) {
			toastError("Please enter a valid stake amount");
			return;
		}

		const data = {
			runnerId: selectionId,
			marketId,
			orderType,
			betAmount: stake,
			rate,
			runnerName,
			matchId,
		};

		const response = await apiCall("POST", "/user/create_order", data);

		if (response.success) {
			verifyUser();
			toastSuccess("Bet placed successfully");
			if (refreshOrders) refreshOrders();
		} else {
			toastError(response.message);
		}
		reset();
	};

	const calculateProfitLoss = (stake, orderType, finalRate) => {
		if (stake <= 0) {
			setProfitLoss(null);
			return;
		}
		const exposure = orderType === "Back" ? -stake : -((finalRate - 1) * stake);
		setProfitLoss(Math.floor(exposure * 100) / 100);
	};

	return (
		<div className={`${className} sidebar right-sidebar`}>
			<a href="#" className="bet-nation-game-name blink-message">
				{/* <Icons
					icon="akar-icons:info-fill"
					className="text-[#000] min-w-[20px] h-[20px]"
				/> */}
				{/* <div>Regular Roulette</div> */}
			</a>

			<div className="sidebar-box">
				<div className="sidebar-title">
					<h4>Live Match</h4>
				</div>
			</div>

			{betData && (
				<div className="sidebar-box place-bet-container">
					<div className="sidebar-title">
						<h4>Place Bet</h4>
					</div>
					<div
						className={`place-bet-box position-relative ${betData.orderType.toLowerCase()}`}
					>
						{apiLoading && (
							<div id="loader-section">
								<div id="load-inner">
									<i className="fa fa-spinner fa-spin"></i>
								</div>
							</div>
						)}
						<div className="place-bet-box-header">
							<div className="place-bet-for">(Bet for)</div>
							<div className="place-bet-odds">Odds</div>
							<div className="place-bet-stake">Stake</div>
							<div className="place-bet-profit">Profit</div>
						</div>
						<div className="place-bet-box-body">
							<div className="place-bet-for">
								<span>{betData.runnerName}</span>
							</div>

							<div className="place-bet-odds">
								<input
									type="text"
									value={inputVal}
									className="form-control"
									// onChange={(e) => setInputVal(+e.target.value)}
								/>
								<div className="spinner-buttons input-group-btn btn-group-vertical">
									<button className="btn-default" onClick={handleIncrease}>
										<Icons
											icon="iconamoon:arrow-up-2-bold"
											className="text-[#000] min-w-[14px] h-[14px]"
										/>
									</button>
									<button className="btn-default" onClick={handleDecrease}>
										<Icons
											icon="iconamoon:arrow-down-2-bold"
											className="text-[#000] min-w-[14px] h-[14px]"
										/>
									</button>
								</div>
							</div>

							<div className="place-bet-stake">
								<input
									type="number"
									className="form-control"
									value={stake}
									onChange={(e) => setStake(+e.target.value)}
								/>
							</div>

							<div className="place-bet-profit">{profitLoss ?? ""}</div>

							<div className="place-bet-buttons">
								{betAmount.map((item) => (
									<button
										key={item.label}
										className="btn btn-place-bet"
										onClick={() => handleBetAmount(item.value)}
									>
										+{item.label}
									</button>
								))}
							</div>
							<button
								className="btn btn-sm btn-link text-dark flex-fill text-end"
								onClick={() => setStake("")}
							>
								clear
							</button>

							<div className="place-bet-action-buttons w-full">
								<div>
									<button className="btn btn-info" onClick={()=>setShowSetValueModal(true)}>Edit</button>
								</div>
								<div>
									<button className="btn btn-danger mr-1" onClick={reset}>
										Reset
									</button>
									<button
										className="btn btn-success"
										onClick={handlePlaceOrder}
									>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="sidebar-box my-bet-container">
				<div className="sidebar-title">
					<h4>My Bet</h4>
				</div>
				<div className="my-bets">
					<MatchBetList orders={orders} />
				</div>
			</div>
		</div>
	);
};

export default RightSidebar;
