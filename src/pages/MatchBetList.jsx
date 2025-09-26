import React from "react";

function MatchBetList({ orders = [] }) {
	return (
		<div className="table-responsive w-100">
			<table className="table">
				<thead>
					<tr>
						<th>Matched Bet</th>
						<th className="text-end">Odds</th>
						<th className="text-end">Stake</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((bet, index) => (
						<tr key={bet._id || index} className={bet.betType?.toLowerCase()}>
							<td>{bet.runnerName}</td>
							<td className="text-end">{bet.rate}</td>
							<td className="text-end">{bet.stake}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default MatchBetList;