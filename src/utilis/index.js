export const formatNumber = (num) => {
  if (num === null || num === undefined) return "-";

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000_00) {
    return (num / 1_000_00).toFixed(1).replace(/\.0$/, "") + "L";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return String(num);
};


export const statusLabels = {
	1: "Active",
	2: "Inactive",
	3: "Suspended",
	4: "Closed",
	9: "Ball Running",
};

export function formatDateTime(date) {
	const pad = (n) => n.toString().padStart(2, "0");

	const day = pad(date.getDate());
	const month = pad(date.getMonth() + 1); // Months are 0-based
	const year = date.getFullYear();

	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());

	return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const getRowClass = (
	rowSuspended,
	suspendedStatus,
	sportId,
	specialGames
) => {
	if (!rowSuspended) return "market-row";
	const hasLabel = !!statusLabels?.[suspendedStatus?.st];
	const extra = hasLabel ? "" : " removed";
	return `market-row suspended-row${extra}`;
};

export const getRowTooltip = (
	rowSuspended,
	suspendedStatus,
	runner,
	sportId,
	specialGames
) => {
	console.log("runner status",runner.status,typeof sportId );
	if (rowSuspended) return "SUSPENDED";
console.log("suspendedStatus",rowSuspended);
	if (
		!specialGames.includes(sportId) &&
		runner?.status &&
		runner?.status !== ""
	) {
		return runner.status;
	}

	return (
		statusLabels?.[suspendedStatus?.st] ??
		(!specialGames.includes(sportId) ? "LOSER" : "REMOVED")
	);
};