import React from 'react'

const RightSideBet = () => {
  return (
        <div className="right-sidebar !max-w-full lg:!max-w-[35%]"><div className="casino-right-sidebar"><div id="casino-bets" className="card m-b-10 my-bet"><div className="card-header !bg-[#B97242B3] flex justify-between items-center !text-[#fff] !px-3 !py-1"><h6 className="card-title float-left !text-[#fff] !font-normal mb-0">My Bets</h6> <a className="btn btn-back !bg-[#7cad79] !border-[#7cad79] float-right">View More</a></div> <div className="card-body1"><div className="tab-content"><div id="matched-bet" className="tab-pane active"><div className="table-responsive1"><table className="table coupon-table table-striped mb-0"><thead><tr><th className='min-w-[90px]'>UserName</th> <th className="text-right min-w-[50px]">Rate</th> <th className="text-right min-w-[70px]">Amount</th></tr></thead> <tbody><tr className='!bg-[#0000000d]'><td colspan="4" className="text-center">No records found</td></tr></tbody></table></div></div></div></div></div> <div className="card m-b-10"><div className="card-header"><h6 className="card-title d-inline-block">
          Rules
          </h6></div> <div className="card-body p-[10px]"><table className="table table-bordered rules-table"><tbody><tr className="text-center"><th colspan="2">Top 9</th></tr> <tr><td width="60%">Card 9</td> <td>1 TO 3</td></tr><tr><td width="60%">Card 8</td> <td>1 TO 4</td></tr><tr><td width="60%">Card 7</td> <td>1 TO 5</td></tr><tr><td width="60%">Card 6</td> <td>1 TO 8</td></tr><tr><td width="60%">Card 5</td> <td>1 TO 30</td></tr></tbody></table></div></div></div> <div className="market-show-icon d-none-desktop"><div className="bet-cnt">0</div> <div className="bet-title">Bets</div></div></div>

  )
}

export default RightSideBet