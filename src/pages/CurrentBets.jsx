import React, { useEffect, useRef, useState } from 'react';

const CurrentBets = () => {

  const accountList = Array.from({ length: 0 }, (_, i) => ({
    date: `demo${i + 1}`,
    credit: "100",
    debit: '0',
    closing: '-100',
    description: "0",
    formate: '0',

  }));

  const [selected, setSelected] = useState("matchbet");
  const [selected2, setSelected2] = useState("all");
  const [entriesPerPage, setEntriesPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('sports');

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='w-full p-3'>
      <div className="listing-grid report-wrapper">
        <div className="row"><div className="col-12"><div className="page-title-box flex items-center justify-between pb-0"><h4 className="mb-0 text-[18px]">Current Bets</h4> <div className="page-title-right"></div></div></div></div>

        <div className="casino-report-tabs"><ul className="nav nav-tabs"><li className="nav-item"><a data-toggle="tab" href="javascript:void(0)" className={`nav-link !text-[#495057] !font-medium !text-[14px] !leading-[15px] ${activeTab === 'sports' ? 'active' : ''}`} onClick={() => setActiveTab("sports")}>Sports</a></li> <li className="nav-item"><a data-toggle="tab" href="javascript:void(0)" className={`nav-link !text-[#495057] !font-medium !text-[14px] !leading-[15px] ${activeTab === 'casino' ? 'active' : ''}`} onClick={() => setActiveTab("casino")}>Casino</a></li></ul></div>

        <div className='card-body !bg-white'>

          <div className="report-form !bg-white pb-3 row align-items-center modal-chekbox">
            {
              activeTab === 'sports' && (
                <div className="col-12"><div className="custom-control custom-radio custom-control-inline"><input
                  type="radio"
                  id="customRadio"
                  name="example"
                  value="matchbet"
                  checked={selected === "matchbet"}
                  onChange={(e) => setSelected(e.target.value)}
                  className="custom-control-input"
                /> <label htmlFor="customRadio" className="custom-control-label !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Matched</label></div>  <div className="custom-control custom-radio custom-control-inline"><input
                  type="radio"
                  id="customRadio2"
                  name="example"
                  value="deletebet"
                  checked={selected === "deletebet"}
                  onChange={(e) => setSelected(e.target.value)}
                  className="custom-control-input"
                /> <label htmlFor="customRadio2" className="custom-control-label !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Deleted</label></div></div>
              )
            }


            <div className="col-6"><div className="custom-control custom-radio custom-control-inline pl-0"><div className="custom-control custom-radio custom-control-inline"><input
              type="radio"
              id="customRadio3"
              name="example1"
              value="all"
              checked={selected2 === "all"}
              onChange={(e) => setSelected2(e.target.value)}
              className="custom-control-input"
            /> <label htmlFor="customRadio3" className="custom-control-label !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">All</label></div> <div className="custom-control custom-radio custom-control-inline"><input
              type="radio"
              id="customRadio4"
              name="example1"
              value="back"
              checked={selected2 === "back"}
              onChange={(e) => setSelected2(e.target.value)}
              className="custom-control-input"
            /> <label htmlFor="customRadio4" className="custom-control-label !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Back</label></div> <div className="custom-control custom-radio custom-control-inline"><input
              type="radio"
              id="customRadio5"
              name="example1"
              value="lay"
              checked={selected2 === "lay"}
              onChange={(e) => setSelected2(e.target.value)}
              className="custom-control-input"
            /> <label htmlFor="customRadio5" className="custom-control-label !text-[#1e1e1e] !text-[14px] !font-medium !leading-[15px]">Lay</label></div></div> <div className="custom-control-inline"><button title="Refresh Data" type="button" className="btn mr-2 btn-primary">Load
            </button></div></div> <div className="col-6 text-right"><div className="custom-control-inlinemr-0 mt-1"><h5>Total Soda: <span className="mr-2">0</span> Total Amount: <span>0.00</span></h5></div></div></div>



          <div className="row pt-3 !bg-white"><div className="col-sm-12 col-md-6"><div id="tickets-table_length" className="dataTables_length"><label className="d-inline-flex items-center text-[14px]">
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
          </label></div></div> <div className="col-sm-12 col-md-6"><div id="tickets-table_filter" className="dataTables_filter text-md-right"><label className="d-inline-flex items-center text-[14px]">
            Search:
            <input name="searchuser" type="search" placeholder="Search..." className="form-control form-control-sm ml-2 form-control !text-[14px]" id="__BVID__250" /> </label></div></div></div>

          {
            activeTab === 'sports' && (
              <div className="table-responsive mb-0 report-table"><div className="table no-footer table-responsive-sm"><table id="eventsListTbl" role="table" aria-busy="false" aria-colcount="8" className="table b-table table-striped table-bordered"><thead role="rowgroup" className=""><tr role="row" className=""><th role="columnheader" scope="col" tabIndex="0" aria-colindex="1" aria-sort="none" className="position-relative"><div>Event Type</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="2" aria-sort="none" className="position-relative"><div>Event Name</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="3" aria-sort="none" className="position-relative"><div>User Name</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="4" aria-sort="none" className="position-relative"><div>M Name</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="5" aria-sort="none" className="position-relative"><div>Nation</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="6" aria-sort="none" className="position-relative text-right"><div>User Rate</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="7" aria-sort="none" className="position-relative text-right"><div>Amount</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="8" aria-sort="none" className="position-relative"><div>Place Date</div><span className="sr-only"> (Click to sort ascending)</span></th></tr></thead><tbody role="rowgroup"><tr role="row" className="b-table-empty-row"><td colspan="8" role="cell" className=""><div role="alert" aria-live="polite"><p className="text-center mb-0">No data available in table</p></div></td></tr></tbody></table></div></div>
            )
          }


          {
            activeTab === 'casino' && (
              <div className="table-responsive mb-0 report-table"><div className="table no-footer table-responsive-sm"><table id="eventsListTbl" role="table" aria-busy="false" aria-colcount="6" className="table b-table table-striped table-bordered"><thead role="rowgroup" className=""><tr role="row" className=""><th role="columnheader" scope="col" tabIndex="0" aria-colindex="1" aria-sort="none" className="position-relative"><div>Event Name</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="2" aria-sort="none" className="position-relative"><div>User Name</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="3" aria-sort="none" className="position-relative"><div>Nation</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="4" aria-sort="none" className="position-relative text-right"><div>User Rate</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="5" aria-sort="none" className="position-relative text-right"><div>Amount</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="6" aria-sort="none" className="position-relative"><div>Place Date</div><span className="sr-only"> (Click to sort ascending)</span></th></tr></thead><tbody role="rowgroup"><tr role="row" className="b-table-empty-row"><td colspan="6" role="cell" className=""><div role="alert" aria-live="polite"><p className="text-center mb-0">No data available in table</p></div></td></tr></tbody></table></div></div>
            )
          }




          <div className="row pt-3 !bg-white"><div className="col"><div className="dataTables_paginate paging_simple_numbers float-right"><ul className="pagination pagination-rounded mb-0"><ul role="menubar" aria-disabled="false" aria-label="Pagination" className="pagination dataTables_paginate paging_simple_numbers my-0 b-pagination justify-content-end"><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to first page" aria-disabled="true" className={`page-link ${currentPage === 1 ? "disabled" : ""}`}>«</span></li><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to previous page" aria-disabled="true" className={`page-link ${currentPage === 1 ? "disabled" : ""}`} onClick={() => goToPage(currentPage - 1)}>‹</span></li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} role="presentation" className={`page-item ${currentPage === i + 1 ? "active" : ""
                }`}><button role="menuitemradio" type="button" aria-label="Go to page 1" aria-checked="true" aria-posinset="1" aria-setsize="1" tabIndex="0" className="page-link btn-primary" onClick={() => goToPage(i + 1)}>{i + 1}</button></li>
            ))}
            <li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to next page" aria-disabled="true" className="page-link">›</span></li><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to last page" aria-disabled="true" className="page-link">»</span></li></ul></ul></div></div></div>
        </div>


      </div>
    </div>
  )
}

export default CurrentBets