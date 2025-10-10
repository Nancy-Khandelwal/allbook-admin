import React from "react";
import MarketTitle from "../../pages/MarketTitle";
import { formatNumber, statusLabels } from "../../utilis";

const backClasses = ["back2", "back1", "back"];
const layClasses = ["lay", "lay1", "lay2"];

const FancyTable = ({
  fancyData = [],
  fancyOddsData = {},
  setBetData,
  showHeaderButtons = false,
}) => {
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
    <div className="min-w-full center-content p-0">
      <div className="game-market market-6 p-0">
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
         
          <div class="bet-table-row justify-end">
            <div class="text-right nation-name"></div>{" "}
            <div class="back bl-title d-none-mobile !w-[58px] lg:!w-[85px] ">
              Back
            </div>{" "}
            <div class="lay bl-title d-none-mobile !w-[58px] lg:!w-[85px]">
              Lay
            </div>
            <div className="fancy-min-max-box text-[12px] md:text-[14px] font-bold w-[58px] lg:w-[85px] flex justify-center items-center">
              Min / Max
            </div>
          </div>
          {/* <div className="fancy-min-max-box font-bold">Min / Max</div> */}
        </div>

        {fancyData.map((item, index) => {
          const oddsData = fancyOddsData[item.marketTypeId]?.rt || [];
          const runnerId = item.runners?.[0]?.runnerId;

          const runnerOdds = oddsData.filter((o) => o.ri === runnerId);
          const back = runnerOdds.find((o) => o.ib === true);
          const lay = runnerOdds.find((o) => o.ib === false);

          const colClass =
            fancyData.length > 1 ? "col-md-12 p-0" : "col-12 p-0";

          return (
            <div key={index} className={colClass}>
              <div className="fancy-market">
                <div
                  className={`market-row flex w-full justify-between items-center px-2 ${
                    back?.rt || lay?.rt ? "" : "suspended-row"
                  }`}
                  data-title={
                    back?.rt || lay?.rt
                      ? ""
                      : statusLabels[back?.st || lay?.st] || "SUSPENDED"
                  }
                >
                  <div className="market-nation-detail pl-2 text-[12px] md:text-[14px]">
                    <span className="market-nation-name !font-normal !text-[12px] md:!text-[14px] text-[#3154fd]">
                      {item.name}
                    </span>
                    <div className="market-nation-book"></div>
                  </div>

                  <div className="flex justify-end items-center">
                    <div
                      className={`market-odd-box text-[12px] md:text-[14px] w-[58px] lg:w-[85px] min-h-[45px] text-center flex items-center justify-center back ${
                        item.changed ? "blink" : ""
                      }`}
                    >
                      <span className="market-odd ">{back?.rt ?? "-"}</span>
                      <span className="market-volume ">{back?.pt ?? ""}</span>
                    </div>

                    <div
                      className={`market-odd-box text-[12px] md:text-[14px] w-[58px] lg:w-[85px] min-h-[45px] text-center flex items-center justify-center lay ${
                        item.changed ? "blink" : ""
                      }`}
                    >
                      <span className="market-odd">{lay?.rt ?? "-"}</span>
                      <span className="market-volume">{lay?.pt ?? ""}</span>
                    </div>

                    <div className="fancy-min-max-box w-[58px] lg:w-[85px] min-h-[45px] ">
                      <div className="fancy-min-max text-center flex flex-col items-center justify-center">
                        <span className="w-100 text-[12px] md:text-[14px] d-block">
                          Min: {formatNumber(item.minBet)}
                        </span>
                        <span className="w-100 text-[12px] md:text-[14px] d-block">
                          Max: {formatNumber(item.maxBet)}
                        </span>
                      </div>
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
