import { statusLabels,getRowClass,getRowTooltip } from "../../utilis";
import React, { Fragment, useState } from "react";
import { specialGames } from "../constant/accountRoles";
import MarketNationDetail from "../MarketNationDetail";
const backClasses = ["back2", "back1", "back"];
const layClasses = ["lay", "lay1", "lay2"];


const MatchOdds = ({
	title,
	marketClass = "",
	showOdds = 6,
	runners = [],
	marketOddsData = {},
	setBetData,
	sportId,
  showHeaderButtons = false,
  socketConnected = true, 
}) => {
	if (!marketOddsData || marketOddsData?.ms === 4) return null;
	const [showDropdown, setShowDropdown] = useState(null);

	const handleBetClick = (runner, item, orderType) => {
		setBetData({
			rate: item.rt,
			selectionId: runner.runnerId,
			marketId: marketOddsData?.bmi,
			orderType,
			orderCategory: "Team",
			runnerName: runner.name,
			marketName: title,
			matchId: marketOddsData?.eid,
		});
	};

	const renderOddBox = (key, item, className, runner, orderType) => {
		const isActive = marketOddsData?.ms === 1;

		if (!item) {
			return (
				<div
					key={key}
					className={`market-odd-box ${className} ${
						key != 2 &&
						(sportId == "7" || sportId == "4339") &&
						"!hidden md:!flex"
					}`}
					data-title="SUSPENDED"
				>
					<span className="market-odd">-</span>
					<span className="market-volume"></span>
				</div>
			);
		}

		return (
			<div
				key={key}
				className={`market-odd-box ${className} ${
					item.changed ? "blink" : ""
				} ${
					key != 2 &&
					(sportId == "7" || sportId == "4339") &&
					"!hidden md:!flex"
				}`}
				data-title={statusLabels[item.st] || ""}
				onClick={() =>
					isActive && item.st == 1 && handleBetClick(runner, item, orderType)
				}
			>
				<span className="market-odd">{item.rt ?? "-"}</span>
				<span className="market-volume">{item.bv ?? ""}</span>
			</div>
		);
	};

	return (
		<div className={`game-market ${marketClass}`}>
			{/* Title */}
			{/* <div className="market-title">
				<span>
					{sportId === "7" || sportId === "4339" ? "MATCH_ODDS" : title}
				</span>
				{!(sportId === "7" || sportId === "4339") && (
					// <button className="btn btn-success btn-sm" disabled>
					// 	Cashout
					// </button>
            <span className="max-bet" title="Max : 1">
             1
           </span>
				)}
			</div> */}
       <div className='market-container mt-0'>
              <div className='market-4'>
                <div className='bet-table'>
         <div
        className="bet-table-header flex justify-between items-center cursor-pointer"
        onClick={() => setShowMarketTable(!showMarketTable)}
      >
        {/* <span title={specialGames.includes(sportId) ? "MATCH_ODDS" : title}>
          {specialGames.includes(sportId) ? "MATCH_ODDS" : title}
        </span> */}
          <span title={title}>
      {title}
    </span>
        
        {showHeaderButtons && (
          <div className="flex gap-2">
            <button className="btn btn-back !bg-[#7cad79] !border !border-[#7cad79] !text-[#fff]">
              Bet Lock
            </button>
            <button className="btn btn-back !bg-[#7cad79] !border !border-[#7cad79] !text-[#fff]">
              User Book
            </button>
          </div>
        )}
  {/* {!specialGames.includes(sportId) && (
          <span className="max-bet" title="Max : 1">
            1
          </span>
        )} */}
      </div>
</div></div>
</div>

			{/* Header */}
			<div className="market-header">
				<div className="market-nation-detail">
					<span className="market-nation-name"> 1</span>
				</div>
				{showOdds > 4 ? (
					<>
						<div className="market-odd-box no-border d-none d-md-block" />
						<div className="market-odd-box no-border d-none d-md-block" />
					</>
				) : null}
				<div className="market-odd-box back">
					<b>Back111</b>
				</div>
				<div className="market-odd-box lay">
					<b>Lay</b>
				</div>
				{showOdds > 4 ? (
					<>
						<div className="market-odd-box no-border d-none d-md-block" />
						<div className="market-odd-box no-border d-none d-md-block" />
					</>
				) : null}
			</div>

			{/* Body */}
			<div
				className={`market-body ${
					marketOddsData?.ms === 1
						? ""
						: !(sportId === "7")
						? "suspended-table"
						: ""
				}`}
				data-title={statusLabels[marketOddsData?.ms] || "SUSPENDED"}
			>
				{runners.map((runner, index) => {
					// Group odds for this runner
					const odds = {
						back: Array(showOdds / 2).fill(null),
						lay: Array(showOdds / 2).fill(null),
					};

					(marketOddsData?.rt || [])
						.filter(({ ri }) => ri == runner.runnerId)
						.forEach((odd) => {
							if (odd.pr >= 0 && odd.pr < showOdds / 2) {
								odd.ib ? (odds.back[odd.pr] = odd) : (odds.lay[odd.pr] = odd);
							}
						});

					// Row suspension logic
					// const rowSuspended =
					//  (!socketConnected) || (
					// 	![...odds.back, ...odds.lay].find(
					// 		(item) => item && item.st === 1
					// 	) && marketOddsData?.ms == 1);
					const rowSuspended =
  !socketConnected ||
  ![...odds.back, ...odds.lay].some((item) => item && item.st === 1) ||
  marketOddsData?.ms !== 1;

					const suspendedStatus = [...odds.back, ...odds.lay].find(
						(item) => item && item.st === 1);
					// const suspendedStatus = [...odds.back, ...odds.lay].find((item) => item);

					// );
console.log("row",rowSuspended)
console.log("odds",odds.back,odds.lay)
					return (
						<Fragment key={runner.runnerId}>
							<div
								className={getRowClass(
									rowSuspended,
									suspendedStatus,
									sportId,
									specialGames
								)}
								data-title={getRowTooltip(
									rowSuspended,
									suspendedStatus,
									runner,
									sportId,
									specialGames
								)}
							>
					
								{/* Conditional runner detail */}
								{sportId === "7" || sportId === "4339" ? (
									<MarketNationDetail
										index={index}
										name={runner.name}
										metadata={runner.metadata ?? {}}
										checkBoxVisible={sportId == "7"}
										showDropdown={showDropdown}
										setShowDropdown={setShowDropdown}
									/>
								) : (
									<div className="market-nation-detail">
										<span className="market-nation-name">{runner.name}</span>
										<div className="market-nation-book" />
									</div>
								)}

								{/* Back odds */}
								{odds.back
									.slice()
									.reverse()
									.map((item, idx) =>
										renderOddBox(idx, item, backClasses[idx], runner, "Back")
									)}

								{/* Lay odds */}
								{odds.lay.map((item, idx) =>
									renderOddBox(idx + 2, item, layClasses[idx], runner, "Lay")
								)}
							</div>
							{showDropdown == index && (
								<div
									className="jockey-detail d-md-none show"
									bis_skin_checked="1"
								>
									{runner?.metadata?.JOCKEY_NAME &&
									runner?.metadata?.TRAINER_NAME &&
									runner?.metadata?.AGE ? (
										<>
											<span className="jockey-detail-box">
												<b>Jockey:</b>
												<span>{runner?.metadata?.JOCKEY_NAME}</span>
											</span>
											<span className="jockey-detail-box">
												<b>Trainer:</b>
												<span>{runner?.metadata?.TRAINER_NAME}</span>
											</span>
											<span className="jockey-detail-box">
												<b>Age:</b>
												<span>{runner?.metadata?.AGE}</span>
											</span>
										</>
									) : (
										<p>There are no horse details !</p>
									)}
								</div>
							)}
						</Fragment>
					);
				})}
			</div>
		</div>
	);
};
// const MatchOdds = ({
// 	title,
// 	marketClass = "",
// 	showOdds = 6,
// 	runners = [],
// 	marketOddsData = {},
// 	setBetData,
// 	sportId,
// }) => {
// 	if (!marketOddsData || marketOddsData?.ms === 4) return null;
// 	const [showDropdown, setShowDropdown] = useState(null);

// 	const handleBetClick = (runner, item, orderType) => {
// 		setBetData({
// 			rate: item.rt,
// 			selectionId: runner.runnerId,
// 			marketId: marketOddsData?.bmi,
// 			orderType,
// 			orderCategory: "Team",
// 			runnerName: runner.name,
// 			marketName: title,
// 			matchId: marketOddsData?.eid,
// 		});
// 	};

// 	const renderOddBox = (key, item, className, runner, orderType) => {
// 		const isActive = marketOddsData?.ms === 1;

// 		if (!item) {
// 			return (
// 				<div
// 					key={key}
// 					className={`market-odd-box ${className} ${
// 						key != 2 &&
// 						(sportId == "7" || sportId == "4339") &&
// 						"!hidden md:!flex"
// 					}`}
// 					data-title="SUSPENDED"
// 				>
// 					<span className="market-odd">-</span>
// 					<span className="market-volume"></span>
// 				</div>
// 			);
// 		}

// 		return (
// 			<div
// 				key={key}
// 				className={`market-odd-box ${className} ${
// 					item.changed ? "blink" : ""
// 				} ${
// 					key != 2 &&
// 					(sportId == "7" || sportId == "4339") &&
// 					"!hidden md:!flex"
// 				}`}
// 				data-title={statusLabels[item.st] || ""}
// 				onClick={() =>
// 					isActive && item.st == 1 && handleBetClick(runner, item, orderType)
// 				}
// 			>
// 				<span className="market-odd">{item.rt ?? "-"}</span>
// 				<span className="market-volume">{item.bv ?? ""}</span>
// 			</div>
// 		);
// 	};

// 	return (
// 		<div className={`game-market ${marketClass}`}>
// 			{/* Title */}
// 			<div className="market-title">
// 				<span>
// 					{sportId === "7" || sportId === "4339" ? "MATCH_ODDS" : title}
// 				</span>
// 				{!(sportId === "7" || sportId === "4339") && (
// 					<button className="btn btn-success btn-sm" disabled>
// 						Cashout
// 					</button>
// 				)}
// 			</div>

// 			{/* Header */}
// 			<div className="market-header">
// 				<div className="market-nation-detail">
// 					<span className="market-nation-name">Max: 1</span>
// 				</div>
// 				{showOdds > 4 ? (
// 					<>
// 						<div className="market-odd-box no-border d-none d-md-block" />
// 						<div className="market-odd-box no-border d-none d-md-block" />
// 					</>
// 				) : null}
// 				<div className="market-odd-box back">
// 					<b>Back</b>
// 				</div>
// 				<div className="market-odd-box lay">
// 					<b>Lay</b>
// 				</div>
// 				{showOdds > 4 ? (
// 					<>
// 						<div className="market-odd-box no-border d-none d-md-block" />
// 						<div className="market-odd-box no-border d-none d-md-block" />
// 					</>
// 				) : null}
// 			</div>

// 			{/* Body */}
// 			<div
// 				className={`market-body ${
// 					marketOddsData?.ms === 1
// 						? ""
// 						: !(sportId === "7")
// 						? "suspended-table"
// 						: ""
// 				}`}
// 				data-title={statusLabels[marketOddsData?.ms] || "SUSPENDED"}
// 			>
// 				{runners.map((runner, index) => {
// 					// Group odds for this runner
// 					const odds = {
// 						back: Array(showOdds / 2).fill(null),
// 						lay: Array(showOdds / 2).fill(null),
// 					};

// 					(marketOddsData?.rt || [])
// 						.filter(({ ri }) => ri == runner.runnerId)
// 						.forEach((odd) => {
// 							if (odd.pr >= 0 && odd.pr < showOdds / 2) {
// 								odd.ib ? (odds.back[odd.pr] = odd) : (odds.lay[odd.pr] = odd);
// 							}
// 						});

// 					// Row suspension logic
// 					const rowSuspended =
// 						![...odds.back, ...odds.lay].find(
// 							(item) => item && item.st === 1
// 						) && marketOddsData?.ms == 1;
// 					const suspendedStatus = [...odds.back, ...odds.lay].find(
// 						(item) => item && item.st === 1
// 					);
// console.log("row",rowSuspended);
// console.log("odds",odds.back,odds.lay);
// 					return (
// 						<Fragment key={runner.runnerId}>
// 							<div
// 								className={getRowClass(
// 									rowSuspended,
// 									suspendedStatus,
// 									sportId,
// 									specialGames
// 								)}
// 								data-title={getRowTooltip(
// 									rowSuspended,
// 									suspendedStatus,
// 									runner,
// 									sportId,
// 									specialGames
// 								)}
// 							>
// 								{/* Conditional runner detail */}
// 								{sportId === "7" || sportId === "4339" ? (
// 									<MarketNationDetail
// 										index={index}
// 										name={runner.name}
// 										metadata={runner.metadata ?? {}}
// 										checkBoxVisible={sportId == "7"}
// 										showDropdown={showDropdown}
// 										setShowDropdown={setShowDropdown}
// 									/>
// 								) : (
// 									<div className="market-nation-detail">
// 										<span className="market-nation-name">{runner.name}</span>
// 										<div className="market-nation-book" />
// 									</div>
// 								)}

// 								{/* Back odds */}
// 								{odds.back
// 									.slice()
// 									.reverse()
// 									.map((item, idx) =>
// 										renderOddBox(idx, item, backClasses[idx], runner, "Back")
// 									)}

// 								{/* Lay odds */}
// 								{odds.lay.map((item, idx) =>
// 									renderOddBox(idx + 2, item, layClasses[idx], runner, "Lay")
// 								)}
// 							</div>
// 							{showDropdown == index && (
// 								<div
// 									className="jockey-detail d-md-none show"
// 									bis_skin_checked="1"
// 								>
// 									{runner?.metadata?.JOCKEY_NAME &&
// 									runner?.metadata?.TRAINER_NAME &&
// 									runner?.metadata?.AGE ? (
// 										<>
// 											<span className="jockey-detail-box">
// 												<b>Jockey:</b>
// 												<span>{runner?.metadata?.JOCKEY_NAME}</span>
// 											</span>
// 											<span className="jockey-detail-box">
// 												<b>Trainer:</b>
// 												<span>{runner?.metadata?.TRAINER_NAME}</span>
// 											</span>
// 											<span className="jockey-detail-box">
// 												<b>Age:</b>
// 												<span>{runner?.metadata?.AGE}</span>
// 											</span>
// 										</>
// 									) : (
// 										<p>There are no horse details !</p>
// 									)}
// 								</div>
// 							)}
// 						</Fragment>
// 					);
// 				})}
// 			</div>
// 		</div>
// 	);
// };

export default MatchOdds;
