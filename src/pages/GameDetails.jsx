import React, { useEffect, useState, useCallback, useRef } from "react";
import RightSidebar from "./RightSidebar";
import MatchOdds from "../components/allSports/MatchOdds";
import FancyTable from "../components/allSports/FancyTable";
import useApi from "../components/hooks/useApi";
import { useUser } from "../components/contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import Banner from "./Banner";
import useToast from "../components/hooks/useToast";
import MatchBetList from "./MatchBetList";
import Loading from "../components/Loading"
import { specialGames } from "../components/constant/accountRoles";
import useSocket from "../components/hooks/useSocket";
import useMarketSubscription from "../components/hooks/useMarketSubscription";


const GameDetails = () => {
  const [showTournamentTabel, setShowTournamentTabel] = useState(true);
  const [bookSummary, setBookSummary] = useState(false);
  const [betData, setBetData] = useState(null);
  const [activeTab, setActiveTab] = useState("matchedBet");
  const [showIframe, setShowIframe] = useState(false);
  const [matchDetails, setMatchDetails] = useState(null);
  const [marketOddsData, setMarketOddsData] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevSubscriptionRef = useRef(null);
  const { apiCall } = useApi();
  const { socket } = useUser();
  const { sportId, matchId, marketId } = useParams();
  const navigate = useNavigate();
  const chunkAndEmit = useCallback(
    (event, matchId, ids = [], size = 50) => {
      if (!socket || !ids?.length) return;
      for (let i = 0; i < ids.length; i += size) {
        socket.emit(event, { matchId, marketIds: ids.slice(i, i + size) });
      }
    },
    [socket]
  );
  const specialGames = ["7", "4339"];
  const getMatchDetails = useCallback(async () => {
    // if(!socket) return;
    setLoading(true);
    try {
      const response = await apiCall(
        "GET",
        `sports/getMatchDetail/${matchId}${specialGames.includes(sportId) ? `?marketId=${marketId}` : ""}`
      );
      if (!response?.success) {

        navigate("/market-analysis");
        throw new Error("No markets available");
      }
      const match = response.data;
      prevSubscriptionRef.current = {
        matchId: match.matchId,
        marketIds: match.marketIds,
        bookmakerRef: match.bookmakerRef,
        fancyRef: match.fancyRef,
      };
      setMatchDetails(match);
      getBetHistory(match._id);
      // Init odds object
      const initialMarkets = [
        ...(marketId ? [marketId] : match.marketIds || []),
        ...(match.bookmakerRef?.map(b => b.marketTypeId) || []),
        ...(match.fancyRef?.map(f => f.marketTypeId) || []),
      ].reduce((acc, id) => ({ ...acc, [id]: {} }), {});
      setMarketOddsData(initialMarkets);
      // Join room & subscribe
      chunkAndEmit("subscribeMarkets", match.matchId, marketId ? [marketId] : match.marketIds);
      chunkAndEmit("subscribeMarkets", match.matchId, match.bookmakerRef?.map(b => b.marketTypeId));
      chunkAndEmit("subscribeMarkets", match.matchId, match.fancyRef?.map(f => f.marketTypeId));
      try {
        socket.emit("joinRoom", { room: match.matchId });
      } catch (err) {
        console.log(err)
      }
      setLoading(false);
    } catch (err) {
      console.log(err)
      console.error(err);
      setLoading(false);
    }
  }, [apiCall, matchId, sportId, marketId, socket, chunkAndEmit, navigate]);
  // --- Leave previous match subscriptions ---
  const leavePreviousMatch = useCallback(
    (prevMatchId, prevMarketIds = [], prevBookmaker = [], prevFancy = []) => {
      if (!socket || !prevMatchId) return;
      socket.emit("leaveRoom", { room: prevMatchId });
      if (prevMarketIds.length) chunkAndEmit("unsubscribeMarkets", prevMatchId, prevMarketIds);
      if (prevBookmaker.length) {
        const ids = prevBookmaker.map(b => b?.marketTypeId).filter(Boolean);
        chunkAndEmit("unsubscribeMarkets", prevMatchId, ids);
      }
      if (prevFancy.length) {
        const ids = prevFancy.map(f => f?.marketTypeId).filter(Boolean);
        chunkAndEmit("unsubscribeMarkets", prevMatchId, ids);
      }
    },
    [socket, chunkAndEmit]
  );
  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      getMatchDetails();
    });
    return () => {
      socket.off("connect");
    };
  }, [socket]);
  // --- Fetch match details & join socket rooms ---
  // --- Fetch bet history ---
  const getBetHistory = useCallback(async (mId) => {
    if (!mId) return;
    const response = await apiCall("GET", `user/match_bet_history/${mId}`);
    if (response.success) setOrders(response.data || []);
  }, [apiCall]);
  // --- Handle socket market updates ---
  useEffect(() => {
    if (!socket) return;
    socket?.emit("joinRoom", { room: 28871646 });
    const handleMarketUpdate = (data) => {
      if (!data?.bmi) return;
      const marketIdStr = String(data.bmi);
      setMarketOddsData(prev => ({
        ...prev,
        [marketIdStr]: { ...data }
      }));
    };
    socket.on("marketUpdate", handleMarketUpdate);
    return () => socket.off("marketUpdate", handleMarketUpdate);
  }, [socket, marketOddsData]);
  // --- Initial load & handle subscriptions ---
  useEffect(() => {
    // leave old subscriptions
    if (prevSubscriptionRef.current) {
      const {
        matchId, marketIds, bookmakerRef, fancyRef } = prevSubscriptionRef.current;
      leavePreviousMatch(matchId, marketIds, bookmakerRef, fancyRef);
    }
    window.scrollTo(0, 0);
    getMatchDetails();
    return () => {
      if (prevSubscriptionRef.current) {
        const { matchId, marketIds, bookmakerRef, fancyRef } = prevSubscriptionRef.current;
        leavePreviousMatch(matchId, marketIds, bookmakerRef, fancyRef);
      }
    };
  }, [matchId, sportId, marketId]);
  if (loading) return <Loading />;
  if (!matchDetails) return null;
  const tournamentWinner = matchDetails.marketTypesRef || [];


  return (
    <div className='w-full p-3'>
      {(sportId === "7" || sportId === "4339") && (
        <div className="market-name-list flex gap-2 my-2">
          {matchDetails?.marketTypesRef?.map((market, idx) => (
            <a
              key={market._id}
              href="javascript:void(0)"
              className={`btn btn-primary ${idx === 0 ? "active" : ""}`}
            >
              {market.type?.toUpperCase() === "WIN"
                ? "MATCH_ODDS"
                : market.type?.toUpperCase()}
            </a>
          ))}
        </div>
      )}

      <div className='detail-page-container flex flex-col-reverse lg:flex-row'>
        <div className='!min-w-full lg:!min-w-[65%] center-main-container'>
          <div className='!min-w-full center-content'>
            <div className="game-header">
              <span className="game-header-name">
                {(sportId === "7" || sportId === "4339") ? (
                  <>
                    {matchDetails?.countryCode} &gt; {matchDetails?.venue}
                  </>
                ) : (
                  <>
                    {matchDetails?.leagueId?.name} &gt; {matchDetails?.name}
                  </>
                )}
              </span>
              <span>
                {new Date(matchDetails.openDate).toLocaleString("en-GB")}
              </span>
            </div>
            <div className='market-container mt-0'>
              <div className='market-4'>
                <div className='bet-table'>

                  {showTournamentTabel && (
                    <div id="market0" data-title="OPEN" className={`bet-table-body ${showTournamentTabel ? 'show' : ''}`}>


                      {matchDetails?.marketTypesRef
                        ?.sort((a, b) => a.marketTypeId.localeCompare(b.marketTypeId))
                        .map((market) => (
                          <MatchOdds
                            key={market._id}
                            title={market.type}
                            runners={market.runners}
                            marketOddsData={marketOddsData[market.marketTypeId]}
                            setBetData={setBetData}
                            showOdds={6}
                            marketClass={
                              sportId === "7"
                                ? "market-12"
                                : sportId === "4339"
                                  ? "market-13"
                                  : "market-4"
                            }
                            sportId={sportId}
                            showHeaderButtons={true}

                          />

                        ))}
                      {matchDetails?.bookmakerRef
                        ?.sort((a, b) => a.marketTypeId.localeCompare(b.marketTypeId))
                        .map((market) => (
                          <MatchOdds
                            key={market._id}
                            title={market.name}
                            runners={market.runners}
                            marketOddsData={marketOddsData[market.marketTypeId]}
                            setBetData={setBetData}
                            showOdds={2}
                            marketClass="market-2"
                            sportId={sportId}
                            showHeaderButtons={true}
                            socketConnected={socket?.connected}
                          />
                        ))}
                      {matchDetails?.fancyRef?.length > 0 && (
                        <FancyTable
                          fancyData={matchDetails.fancyRef}
                          fancyOddsData={Object.fromEntries(
                            matchDetails.fancyRef.map(({ marketTypeId }) => [
                              marketTypeId,
                              marketOddsData[marketTypeId]?.rt?.length > 0
                                ? marketOddsData[marketTypeId]
                                : {},
                            ])
                          )}
                          setBetData={setBetData}
                          // showHeaderButtons={true}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-sidebar !min-w-full lg:!min-w-[35%]" data-simplebar="true">
          <div className="simplebar-wrapper m-0" >
            <div className="simplebar-height-auto-observer-wrapper">
              <div className="simplebar-height-auto-observer"></div></div>
            <div className="simplebar-mask"><div className="simplebar-offset bottom-0 right-0" >
              <div className="simplebar-content-wrapper h-auto overflow-hidden" tabindex="0" role="region" aria-label="scrollable content" >
                <div className="simplebar-content p-0" ><div className="card mb-2">
                  {!(sportId === "7" || sportId === "4339") && (
                    <>
                      <div className="booksum-box-container mb-2">
                        <div
                          data-toggle="collapse"
                          data-target="#demo"
                          className="booksum-title"
                          aria-expanded="true"
                          onClick={() => setBookSummary(!bookSummary)}
                        >
                          Book Summary
                        </div>
                        {bookSummary && (
                          <div id="demo" className={`booksum-desc ${bookSummary ? "show" : ""}`}>
                            <div className="booksum-box">
                              <span>No Data Found</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <div className="card-header">
                          <h6 className="card-title float-left">Score Card</h6>
                        </div>
                      </div>
                      {matchDetails?.scoreCardUrl && (
  <div className="mb-2">
    <div className="card-header">
      <h6 className="card-title float-left">Score Card</h6>
    </div>
    {/* Agar iframe ya koi content show karna ho */}
    <div className="card-body">
      <iframe
        src={matchDetails.scoreCardUrl}
        title="Score Card"
        width="100%"
        height="400"
        frameBorder="0"
      ></iframe>
    </div>
  </div>
)}

                    </>
                  )}
                </div>
                  {(sportId === "7" || sportId === "4339") && (
                    <div id="hwlls-player" className="mb-2">
                 <div
  className="card-header flex items-center cursor-pointer"
  onClick={() => setShowIframe(!showIframe)}
>
  <div className="flex items-center gap-2">
    <i className="fas fa-chevron-down"></i>
    <h6 className="card-title m-0">Live Match</h6>
  </div>
</div>


                      {showIframe && (
                        <div>
                          <div className="mute-btn">
                            {/* <img
            src="/Images/volume-mute-solid.png"
            id="btnMute"
            value="btnMute"
            onClick={() => muteAudio && muteAudio()}
            alt="mute"
          /> */}
                          </div>

                          <i
                            id="vloader"
                            className="fas fa-spinner fa-spin"
                            style={{ display: "none" }}
                          ></i>

                          <div
                            id="player_container"
                            style={{
                              width: "100%",
                              height: "100%",
                              position: "relative",
                              overflow: "hidden",
                              backgroundColor: "rgb(0, 0, 0)",
                            }}
                          >
                            <audio
                              id="audio_player"
                              autoPlay
                              playsInline
                              webkit-playsinline="true"
                            ></audio>
                            <video
                              id="video_player"
                              autoPlay
                              playsInline
                              webkit-playsinline="true"
                              style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            ></video>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                <div id="my-game-bets" className="card mb-2 my-bet">
                  <div className="card-header">
                    <h6 className="card-title float-left">My Bets</h6>
                    <a href="javascript:void(0)" className="btn btn-back float-right !bg-[#7cad79] !border !border-[#7cad79] !text-[#fff]">View More</a></div> <div className="card-body"><div className="tabs" id="__BVID__73"><div className=""><ul role="tablist" className="nav nav-tabs small" id="__BVID__73__BV_tab_controls_"><li role="presentation" className="nav-item" onClick={() => setActiveTab('matchedBet')}><a role="tab" aria-selected="true" aria-setsize="2" aria-posinset="1" href="#" target="_self" className={`nav-link ${activeTab === 'matchedBet' ? 'active' : ''} `} id="__BVID__74___BV_tab_button__" aria-controls="__BVID__74">Matched Bets</a></li><li onClick={() => setActiveTab('unmatchedBet')} role="presentation" className="nav-item"><a role="tab" tabindex="-1" aria-selected="false" aria-setsize="2" aria-posinset="2" href="#" target="_self" className={`nav-link ${activeTab === 'unmatchedBet' ? 'active' : ''}`} id="__BVID__76___BV_tab_button__" aria-controls="__BVID__76">Unmatched Bets</a></li></ul></div><div className="tab-content" id="__BVID__73__BV_tab_container_"><div role="tabpanel" aria-hidden="false" className="tab-pane active" id="__BVID__74" aria-labelledby="__BVID__74___BV_tab_button__"><div id="matched-bet" className="tab-pane active"><div className="table-responsive"><table className="table coupon-table mb-0"><thead><tr><th className='min-w-[90px]'>UserName</th> <th className="min-w-[90px]">Nation</th> <th className="text-right min-w-[50px]">
                      Rate
                    </th> <th className="text-right min-w-[70px]">
                        Amount
                      </th></tr></thead> <tbody><tr><td colspan="4" className="text-center">
                        No records found
                      </td></tr></tbody></table></div></div></div> <div role="tabpanel" aria-hidden="true" className="tab-pane hidden" id="__BVID__76" aria-labelledby="__BVID__76___BV_tab_button__" ><div id="unmatched-bet" className="tab-pane"><div className="table-responsive"><table className="table coupon-table mb-0"><thead><tr><th className="min-w-[90px]">UserName</th> <th className="min-w-[90px]">Nation</th> <th className="text-right min-w-[50px]">
                        Rate
                      </th> <th className="text-right min-w-[70px]">
                          Amount
                        </th></tr></thead> <tbody><tr><td colspan="4" className="text-center">
                          No records found
                        </td></tr></tbody></table></div></div></div></div></div></div></div></div></div></div></div><div className="simplebar-placeholder w-auto h-[272px]"></div></div><div className="simplebar-track simplebar-horizontal opacity-0" ><div className="simplebar-scrollbar w-0 hidden"></div></div><div className="simplebar-track simplebar-vertical opacity-0"><div className="simplebar-scrollbar h-0 hidden" ></div></div></div>
    </div>

  )
}

export default GameDetails