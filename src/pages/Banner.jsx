import React from "react";
// import topBanner from "@images/top-banner.png";
// import { statusMap } from "@/constants";

const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return {
        hours: hours > 0 ? `${hours}` : "0",
        minutes: minutes > 0 ? `${minutes}` : "0",
        seconds: seconds > 0 ? `${seconds}` : "0",
    };
};

const Banner = ({ countryCode, venue, startTime, marketName, status }) => {
    const [displayTime, setDisplayTime] = React.useState(formatTime(0));

    React.useEffect(() => {
        const getTimeDiff = () => {
            const now = Date.now();
            const start = new Date(startTime).getTime();
            return start - now;
        };

        const updateTimer = () => {
            const diff = getTimeDiff();
            setDisplayTime(formatTime(diff > 0 ? diff : 0));
        };

        updateTimer(); // initial call
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [startTime, status]);

    const isCountdownActive =
        displayTime.hours !== "0" ||
        displayTime.minutes !== "0" ||
        displayTime.seconds !== "0";

    return (
        <div className="horse-banner">
            <img src={topBanner} alt="" className="img-fluid" />
            <div className="horse-banner-detail">
                <div
                    className={`text-${status === 1 ? "success" : "danger"
                        } text-uppercase`}
                >
                    {statusMap[status] ??
                        (isCountdownActive ? "OPEN" : "SUSPENDED")}
                </div>
                <div className="horse-timer">
                    <span>
                        {displayTime.hours !== "0" && (
                            <>
                                {displayTime.hours} <small>Hours</small> &nbsp;
                            </>
                        )}
						{displayTime.seconds !== "0" && (
                            <>
                                {displayTime.minutes} <small>Minutes</small> &nbsp;
                            </>
                        )}
                        {displayTime.hours == "0" && displayTime.seconds !== "0" && (
                            <>
                                {displayTime.seconds} <small>Seconds</small>
                            </>
                        )}{" "}
                    </span>
                    {isCountdownActive && <span>Remaining</span>}
                </div>
                <div className="time-detail">
                    <p>
                        {countryCode} &gt; {venue}
                    </p>
                    <h5>
                        <span>
                            {new Intl.DateTimeFormat("en-GB", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                            }).format(new Date(startTime))}
                        </span>
                        <span> | {marketName}</span>
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Banner;