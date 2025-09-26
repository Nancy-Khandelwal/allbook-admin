import React, { useState } from 'react'

const CasinoReport = () => {

    const accountList = Array.from({ length: 0 }, (_, i) => ({
        username: `demo${i + 1}`,
        creditReferance: "100",
        balance: '0',
        client: '-100',
        exposure: "0",
        availableBalance: '0',
        exposureLimit: "0",
        defaultPersentage: "0",
        accountType: "User",
    }));

    const [showMessage, setShowMessage] = useState(false);
    const [entriesPerPage, setEntriesPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);

    // Total pages
    const totalPages = Math.ceil(accountList.length / entriesPerPage);

    // Slice data for current page
    const paginatedData = accountList.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    // Handle page change
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };


    return (
        <div className='w-full p-3'>
            <div className='live-bets-report listing-grid report-wrapper'>
                <div className="row"><div className="col-12"><div className="page-title-box pb-0 flex items-center justify-between"><h4 className="mb-0 text-[18px]">Casino Report</h4> <div className="page-title-right"></div></div></div></div>

                <div className="row"><div className="col-12"><div className="card"><div className="card-body"><form method="post" data-vv-scope="casinoResult" className="ajaxFormSubmit"><div className="row row5 mb-3"><div className="col-xl-2 mb-3"><select name="reportType" className="form-control is-invalid" aria-required="true" aria-invalid="true"><option value="">Select Casino Type</option> <option value="settled">Settled Bets</option> <option value="unsettled">UnSettled Bets</option></select></div> <div className="form-group col-xl-2" onFocus={() => setShowMessage(true)} onBlur={() => setShowMessage(false)}><div tabIndex="-1" role="combobox" aria-owns="listbox-null" className="multiselect"><div className="multiselect__select"></div>  <div className="multiselect__tags" ><div className="multiselect__tags-wrap hidden"></div>  <div className="multiselect__spinner hidden"></div>
                    {/* <input name="" type="text" autoComplete="off" spellCheck="false" placeholder="Select option" tabIndex="0" aria-controls="listbox-null" className="multiselect__input" style="width: 0px; position: absolute; padding: 0px;" /> */}
                    <span className="multiselect__placeholder">
                        Select option
                    </span></div> <div tabIndex="-1" className="multiselect__content-wrapper max-h-[300px] hidden">
                        {
                            showMessage && (
                                <ul role="listbox" id="listbox-null" className="multiselect__content block">   <li className='hidden'><span className="multiselect__option">No elements found. Consider changing the search query.</span></li> <li><span className="multiselect__option">List is empty.</span></li> </ul>
                            )
                        }


                    </div></div></div>  <div className="col-xl-2 mb-3"><select name="gtype" className="form-control is-invalid" aria-required="true" aria-invalid="true"><option value="">Select</option> <option value="ezugi">
                        Ezugi
                    </option><option value="ss">
                            Super Spade
                        </option><option value="qt">
                            Slot 3
                        </option><option value="evo">
                            Evolution
                        </option><option value="cockfight">
                            CockFight
                        </option><option value="ludo">
                            Ludo Classic
                        </option><option value="pop-the-ball">
                            PopTheBall
                        </option><option value="binary">
                            Binary
                        </option><option value="tgs">
                            Slot 2
                        </option><option value="slot">
                            Slot
                        </option><option value="tgslive">
                            LuckyStreak
                        </option><option value="rummy">
                            Rummy
                        </option><option value="ludo-lands">
                            Ludo Lands
                        </option><option value="vivo">
                            vivo gaming
                        </option><option value="snakes-and-ladders">
                            snakes and ladders
                        </option><option value="bc">
                            Creedroomz
                        </option><option value="smart">
                            Smart Soft
                        </option><option value="astar">
                            Astar Game
                        </option><option value="ds">
                            Dragoon soft
                        </option><option value="tembo">
                            Tembo
                        </option><option value="av">
                            Aviator
                        </option><option value="bcslot">
                            Pascal Game
                        </option><option value="lottery">
                            Lottery
                        </option><option value="scratch">
                            Scratch
                        </option><option value="darwin">
                            Darwin
                        </option><option value="pg">
                            Pocket Game
                        </option><option value="bet">
                            Bet Core
                        </option><option value="jilli">
                            Jili
                        </option><option value="win">
                            Win
                        </option><option value="gemini1">
                            Gemini
                        </option><option value="amigo">
                            Amigo
                        </option><option value="egt">
                            EGT
                        </option></select></div> <div className="col-xl mb-3"><button type="submit" id="loaddata" className="btn btn-primary">
                            Submit
                        </button> <div className="d-inline-block ml-3"></div></div></div></form> <div className="row"><div className="col-sm-12 col-md-6"><div id="tickets-table_length" className="dataTables_length"><label className="d-inline-flex items-center text-[14px] leading-[15px]">
                                            Show&nbsp;
                                            <select className="custom-select custom-select-sm" id="__BVID__249"
                                            value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1); // reset to first page
                }}
                >{[25, 50, 100, 250, 500, 750, 1000].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}</select>&nbsp;entries
                                        </label></div></div> <div className="col-sm-12 col-md-6"><div id="tickets-table_filter" className="dataTables_filter text-md-right"><label className="d-inline-flex items-center text-[14px] leading-[15px]">
                                            Search:
                                            <input name="searchuser" type="search" placeholder="Search..." className="form-control form-control-sm ml-2 form-control" id="__BVID__250" /> </label></div></div></div> <div className="table-responsive mb-0 mt-2 report-table"><div className="table table-bordered no-footer table-hover table-responsive-sm"><table id="eventsListTbl" role="table" aria-busy="false" aria-colcount="7" className="table b-table table-striped table-bordered"><thead role="rowgroup" className=""><tr role="row" className=""><th role="columnheader" scope="col" tabIndex="0" aria-colindex="1" aria-sort="none" className="position-relative"><div>Game Name</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="2" aria-sort="none" className="position-relative"><div>Type</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="3" aria-sort="none" className="position-relative text-right"><div>Amount</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="4" aria-sort="none" className="position-relative text-right"><div>Total</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="5" aria-sort="none" className="position-relative"><div>Date</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="6" aria-sort="none" className="position-relative"><div>Round Id</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="7" aria-sort="none" className="position-relative"><div>Transaction Id</div><span className="sr-only"> (Click to sort ascending)</span></th></tr></thead><tbody role="rowgroup"><tr role="row" className="b-table-empty-row"><td colspan="7" role="cell" className=""><div role="alert" aria-live="polite"><p className="text-center mb-0">No data available in table</p></div></td></tr></tbody></table></div></div>
                    <div className="row pt-3"><div className="col"><div className="dataTables_paginate paging_simple_numbers float-right"><ul className="pagination pagination-rounded mb-0"><ul role="menubar" aria-disabled="false" aria-label="Pagination" className="pagination dataTables_paginate paging_simple_numbers my-0 b-pagination justify-content-end"><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to first page" aria-disabled="true" className={`page-link ${currentPage === 1 ? "disabled" : ""}`}>«</span></li><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to previous page" aria-disabled="true" className={`page-link ${currentPage === 1 ? "disabled" : ""}`} onClick={() => goToPage(currentPage - 1)}>‹</span></li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} role="presentation" className={`page-item ${currentPage === i + 1 ? "active" : ""
                                }`}><button role="menuitemradio" type="button" aria-label="Go to page 1" aria-checked="true" aria-posinset="1" aria-setsize="1" tabIndex="0" className="page-link btn-primary" onClick={() => goToPage(i + 1)}>{i + 1}</button></li>
                        ))}
                        <li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to next page" aria-disabled="true" className="page-link">›</span></li><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to last page" aria-disabled="true" className="page-link">»</span></li></ul></ul></div></div></div></div></div></div></div>
            </div>
        </div>
    )
}

export default CasinoReport