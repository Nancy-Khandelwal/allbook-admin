import React from "react";
import MarketTitle from "../../pages/MarketTitle";
import { formatNumber, statusLabels } from "../../utilis";

// const FancyTable = ({ fancyData = [], fancyOddsData = {}, setBetData }) => {
// 	return (
// 		<div className="game-market market-6">
// 			<MarketTitle title="Fancy" />

// 			{/* Header */}
// 			<div className="row row10">
// 				<div className="col-md-6">
// 					<div className="market-header">
// 						<div className="market-nation-detail"></div>
// 						<div className="market-odd-box back">
// 							<b>Back</b>
// 						</div>
// 						<div className="market-odd-box lay">
// 							<b>Lay</b>
// 						</div>
// 						<div className="fancy-min-max-box"></div>
// 					</div>
// 				</div>
// 				{fancyData.length > 1 && (
// 					<div className="col-md-6 d-none d-xl-block">
// 						<div className="market-header">
// 							<div className="market-nation-detail"></div>
// 							<div className="market-odd-box back">
// 								<b>Back</b>
// 							</div>
// 							<div className="market-odd-box lay">
// 								<b>Lay</b>
// 							</div>
// 							<div className="fancy-min-max-box"></div>
// 						</div>
// 					</div>
// 				)}
// 			</div>

// 			{/* Body */}
// 			<div className="market-body">
// 				<div className="row row10">
// 					{fancyData.map((item, index) => {
// 						const oddsData = fancyOddsData[item.marketTypeId]?.rt || [];
// 						const runnerId = item.runners?.[0]?.runnerId;

// 						// filter odds for this runner
// 						const runnerOdds = oddsData.filter((o) => o.ri === runnerId);
// 						const back = runnerOdds.find((o) => o.ib === true);
// 						const lay = runnerOdds.find((o) => o.ib === false);

// 						const colClass = fancyData.length > 1 ? "col-md-6" : "col-12";

// 						return (
// 							<div key={index} className={colClass}>
// 								<div className="fancy-market">
// 									<div className={`market-row ${back?.rt || lay?.rt ? "" : "suspended-row"}`} data-title={back?.rt || lay?.rt ? "" : statusLabels[back?.st || lay?.st] || "SUSPENDED"}>
// 										<div className="market-nation-detail">
// 											<span className="market-nation-name">{item.name}</span>
// 											<div className="market-nation-book"></div>
// 										</div>

// 										{/* Back odds */}
// 										<div
// 											className={`market-odd-box back ${
// 												item.changed ? "blink" : ""
// 											}`}
// 										>
// 											<span className="market-odd">{back?.rt ?? "-"}</span>
// 											<span className="market-volume">{back?.pt ?? ""}</span>
// 										</div>

// 										{/* Lay odds */}
// 										<div
// 											className={`market-odd-box lay ${
// 												item.changed ? "blink" : ""
// 											}`}
// 										>
// 											<span className="market-odd">{lay?.rt ?? "-"}</span>
// 											<span className="market-volume">{lay?.pt ?? ""}</span>
// 										</div>

// 										{/* Min / Max from static fancyData */}
// 										<div className="fancy-min-max-box">
// 											<div className="fancy-min-max">
// 												<span className="w-100 d-block">
// 													Min: {formatNumber(item.minBet)}
// 												</span>
// 												<span className="w-100 d-block">
// 													Max: {formatNumber(item.maxBet)}
// 												</span>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						);
// 					})}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
const backClasses = ["back2", "back1", "back"];
const layClasses = ["lay", "lay1", "lay2"];

// const FancyTable = ({ fancyData = [], fancyOddsData = {}, setBetData }) => {
// 	return (
// 		<div className="game-market market-6">
// 			<MarketTitle title="Fancy" />

// 			{/* Header */}
// 			<div className="row row10">
// 				<div className={`${fancyData.length > 1 ? "col-md-6" : "col-12"}`}>
// 					<div className="market-header">
// 						<div className="market-nation-detail"></div>
// 						<div className="market-odd-box back">
// 							<b>Back</b>
// 						</div>
// 						<div className="market-odd-box lay">
// 							<b>Lay</b>
// 						</div>
// 						<div className="fancy-min-max-box"></div>
// 					</div>
// 				</div>
// 				{fancyData.length > 1 && (
// 					<div className="col-md-6 d-none d-xl-block">
// 						<div className="market-header">
// 							<div className="market-nation-detail"></div>
// 							<div className="market-odd-box back">
// 								<b>Back</b>
// 							</div>
// 							<div className="market-odd-box lay">
// 								<b>Lay</b>
// 							</div>
// 							<div className="fancy-min-max-box"></div>
// 						</div>
// 					</div>
// 				)}
// 			</div>

// 			{/* Body */}
// 			<div className="market-body">
// 				<div className="row row10">
// 					{fancyData.map((item, index) => {
// 						const oddsData = fancyOddsData[item.marketTypeId]?.rt || [];
// 						const runnerId = item.runners?.[0]?.runnerId;

						
// 						const runnerOdds = oddsData.filter((o) => o.ri === runnerId);
// 						const back = runnerOdds.find((o) => o.ib === true);
// 						const lay = runnerOdds.find((o) => o.ib === false);

// 						const colClass = fancyData.length > 1 ? "col-md-6" : "col-12";

// 						return (
// 							<div key={index} className={colClass}>
// 								<div className="fancy-market">
// 									<div className={`market-row ${back?.rt || lay?.rt ? "" : "suspended-row"}`} data-title={back?.rt || lay?.rt ? "" : statusLabels[back?.st || lay?.st] || "SUSPENDED"}>
// 										<div className="market-nation-detail">
// 											<span className="market-nation-name">{item.name}</span>
// 											<div className="market-nation-book"></div>
// 										</div>

										
// 										<div
// 											className={`market-odd-box back ${
// 												item.changed ? "blink" : ""
// 											}`}
// 										>
// 											<span className="market-odd">{back?.rt ?? "-"}</span>
// 											<span className="market-volume">{back?.pt ?? ""}</span>
// 										</div>

										
// 										<div
// 											className={`market-odd-box lay ${
// 												item.changed ? "blink" : ""
// 											}`}
// 										>
// 											<span className="market-odd">{lay?.rt ?? "-"}</span>
// 											<span className="market-volume">{lay?.pt ?? ""}</span>
// 										</div>

										
// 										<div className="fancy-min-max-box">
// 											<div className="fancy-min-max">
// 												<span className="w-100 d-block">
// 													Min: {formatNumber(item.minBet)}
// 												</span>
// 												<span className="w-100 d-block">
// 													Max: {formatNumber(item.maxBet)}
// 												</span>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						);
// 					})}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
const FancyTable = ({ fancyData = [], fancyOddsData = {}, setBetData,showHeaderButtons = false }) => {
  const handleBetClick = (runner, odd, orderType, marketId) => {
    if (!odd) return;
    setBetData({
      rate: odd.rt,
      selectionId: runner.runnerId,
      marketId,
      orderType,
      orderCategory: "Team",
      runnerName: runner.name,
      marketName: marketId
        ? fancyData.find((m) => m.marketTypeId === marketId)?.name
        : "Fancy",
    });
  };

  const renderOddBox = (key, odd, className, runner, orderType, marketId) => {
    if (!odd) {
      return (
        <div key={key} className={`bl-box ${className}`} data-title="SUSPENDED">
          <span className="d-block odds">—</span>
          <span className="market-volume"></span>
        </div>
      );
    }

    return (
      <div
        key={key}
        className={`bl-box ${className} ${odd.changed ? "blink" : ""}`}
        data-title={statusLabels[odd.st] || ""}
        onClick={() =>
          odd.st === 1 && handleBetClick(runner, odd, orderType, marketId)
        }
      >
        <span className="d-block odds">{odd.rt ?? "—"}</span>
        <span className="market-volume">{odd.pt ?? ""}</span>
      </div>
    );
  };

  return (
    <div className ="min-w-full center-content">
   <div className="game-market market-6">
  <div className="market-container mt-0">
    <div className="market-4">
      <div className="bet-table">
        <div className="bet-table-header flex justify-between items-center cursor-pointer">
          <MarketTitle title="Fancy" />
          {showHeaderButtons && (
            <div className="flex gap-2">
              <button className="btn btn-back !bg-[#7cad79] !border !border-[#7cad79] !text-[#fff]">
                Bet Lock 
              </button>
              {/* <button className="btn btn-back !bg-[#7cad79] !border !border-[#7cad79] !text-[#fff]">
                User Book
              </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
      {/* Table Header */}
      <div className="bet-table-row bet-table-row-top flex justify-between items-center">
        {/* <div className="nation-name font-bold">Market Name</div> */}
        <div className="flex space-x-1">
          {backClasses.map((cls, i) => (
            <div key={i} className={`back ${cls} bl-title`}>
              Back
            </div>
          ))}
          {layClasses.map((cls, i) => (
            <div key={i} className={`lay ${cls} bl-title`}>
              Lay
            </div>
          ))}
        </div>
        <div className="fancy-min-max-box font-bold">Min / Max</div>
      </div>

      {/* Table Body */}
      {/* {fancyData.map((market) => {
        const oddsData = fancyOddsData[market.marketTypeId]?.rt || [];

        return market.runners.map((runner) => {
          const runnerOdds = oddsData.filter((o) => o.ri === runner.runnerId);
          const backOdds = runnerOdds.filter((o) => o.ib === true);
          const layOdds = runnerOdds.filter((o) => o.ib === false);

          return (
            <div
              key={runner.runnerId}
              className="bet-table-row flex justify-between items-center"
              data-title="ACTIVE"
            >
              
              <div className="nation-name d-none-mobile w-1/4">
                <p>{market.name}</p>
              </div>

             
              <div className="flex w-1/2 space-x-1">
                {backClasses.map((cls, i) =>
                  renderOddBox(
                    i,
                    backOdds[i],
                    `back ${cls}`,
                    runner,
                    "Back",
                    market.marketTypeId
                  )
                )}
                {layClasses.map((cls, i) =>
                  renderOddBox(
                    i,
                    layOdds[i],
                    `lay ${cls}`,
                    runner,
                    "Lay",
                    market.marketTypeId
                  )
                )}
              </div>

            
              <div className="fancy-min-max-box w-1/4">
                <div className="fancy-min-max">
                  <span className="w-100 d-block">
                    Min: {formatNumber(market.minBet)}
                  </span>
                  <span className="w-100 d-block">
                    Max: {formatNumber(market.maxBet)}
                  </span>
                </div>
              </div>
            </div>
          );
        });
      })} */}
	  {fancyData.map((item, index) => {
						const oddsData = fancyOddsData[item.marketTypeId]?.rt || [];
						const runnerId = item.runners?.[0]?.runnerId;

						
						const runnerOdds = oddsData.filter((o) => o.ri === runnerId);
						const back = runnerOdds.find((o) => o.ib === true);
						const lay = runnerOdds.find((o) => o.ib === false);

						const colClass = fancyData.length > 1 ? "col-md-6" : "col-12";

						return (
							<div key={index} className={colClass}>
								<div className="fancy-market">
									<div className={`market-row ${back?.rt || lay?.rt ? "" : "suspended-row"}`} data-title={back?.rt || lay?.rt ? "" : statusLabels[back?.st || lay?.st] || "SUSPENDED"}>
										<div className="market-nation-detail">
											<span className="market-nation-name">{item.name}</span>
											<div className="market-nation-book"></div>
										</div>

								
										<div
											className={`market-odd-box back ${
												item.changed ? "blink" : ""
											}`}
										>
											<span className="market-odd">{back?.rt ?? "-"}</span>
											<span className="market-volume">{back?.pt ?? ""}</span>
										</div>

										
										<div
											className={`market-odd-box lay ${
												item.changed ? "blink" : ""
											}`}
										>
											<span className="market-odd">{lay?.rt ?? "-"}</span>
											<span className="market-volume">{lay?.pt ?? ""}</span>
										</div>

									
										<div className="fancy-min-max-box">
											<div className="fancy-min-max">
												<span className="w-100 d-block">
													Min: {formatNumber(item.minBet)}
												</span>
												<span className="w-100 d-block">
													Max: {formatNumber(item.maxBet)}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
    </div>
    </div>
  );
};

export default FancyTable;
