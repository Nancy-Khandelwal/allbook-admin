import React, { useState } from 'react'
import DatePickerModal from '../components/DatePickerModal'

const CasinoResultReport = () => {

      const accountList = Array.from({ length: 0 }, (_, i) => ({
        username: `demo${i + 1}`,
        craditreferance: "100",
        exposureLimit: "0",
        defaultPersentage: "0",
        accountType: "User",
      }));
    
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
                <div className="row"><div className="col-12"><div className="page-title-box pb-0 flex items-center justify-between"><h4 className="mb-0 text-[18px]">Casino Result Report</h4> <div className="page-title-right"></div></div></div></div>

                <form method="post" data-vv-scope="casinoResult" className="ajaxFormSubmit"><div className="row row5 mb-3"><div className="co-2 mb-2"><div className="mx-datepicker"><div className="mx-input-wrapper"><DatePickerModal /></div></div></div> <div className="col-2 mb-2"><select name="gtype" className="form-control" aria-required="true" aria-invalid="false"><option value="">Select Casino</option> <option value="teen">
            Teenpatti 1-day
          </option><option value="poker">
            Poker 1-Day
          </option><option value="teen20v">
            20-20 Teenpatti VIP
          </option></select></div> <div className="col-6 mb-2"><button type="submit" id="loaddata" className="btn btn-primary">
          Submit
        </button> <div className="d-inline-block ml-3"></div></div></div></form>

         <div className="row"><div className="col-sm-12 col-md-6"><div id="tickets-table_length" className="dataTables_length"><label className="d-inline-flex items-center text-[14px] leading-[15px]">
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
                                            <input name="searchuser" type="search" placeholder="Search..." className="form-control form-control-sm ml-2 form-control" id="__BVID__250" /> </label></div></div></div>

                                            <div className="table-responsive mb-0 report-table casino-result-table"><div className="table no-footer table-hover table-responsive-sm"><table id="eventsListTbl" role="table" aria-busy="false" aria-colcount="2" className="table b-table table-striped table-bordered b-table-fixed"><thead role="rowgroup" className=""><tr role="row" className=""><th role="columnheader" scope="col" tabIndex="0" aria-colindex="1" aria-sort="none" className="position-relative"><div>Market Id</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="2" aria-sort="none" className="position-relative"><div>Winner</div><span className="sr-only"> (Click to sort ascending)</span></th></tr></thead><tbody role="rowgroup"><tr role="row" className="b-table-empty-row"><td colspan="2" role="cell" className=""><div role="alert" aria-live="polite"><p className="text-center mb-0">No data available in table</p></div></td></tr></tbody></table></div></div>

                                            <div className="row pt-3"><div className="col"><div className="dataTables_paginate paging_simple_numbers float-right"><ul className="pagination pagination-rounded mb-0"><ul role="menubar" aria-disabled="false" aria-label="Pagination" className="pagination dataTables_paginate paging_simple_numbers my-0 b-pagination justify-content-end"><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to first page" aria-disabled="true" className={`page-link ${currentPage === 1 ? "disabled" : ""}`}>«</span></li><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to previous page" aria-disabled="true" className={`page-link ${currentPage === 1 ? "disabled" : ""}`} onClick={() => goToPage(currentPage - 1)}>‹</span></li>
                                        {Array.from({ length: totalPages }, (_, i) => (
                                        <li key={i} role="presentation" className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}><button role="menuitemradio" type="button" aria-label="Go to page 1" aria-checked="true" aria-posinset="1" aria-setsize="1" tabIndex="0" className="page-link btn-primary" onClick={() => goToPage(i + 1)}>{i + 1}</button></li>
                                        ))}
                                        <li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to next page" aria-disabled="true" className="page-link">›</span></li><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to last page" aria-disabled="true" className="page-link">»</span></li></ul></ul></div></div></div>

         </div>
    </div>
  )
}

export default CasinoResultReport