import React, { useEffect, useRef, useState } from 'react';
import DatePickerModal from '../components/DatePickerModal';

const AccountStatement = () => {

  const accountList = Array.from({ length: 0 }, (_, i) => ({
    date: `demo${i + 1}`,
    credit: "100",
    debit: '0',
    closing: '-100',
    description: "0",
    formate: '0',

  }));

  const [showMessage, setShowMessage] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

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
        <div className="row"><div className="col-12"><div className="page-title-box flex items-center justify-between pb-0"><h4 className="mb-0 text-[18px]">Account Statement</h4> <div className="page-title-right"></div></div></div></div>

        <div className="report-form mb-0 mt-3"><form method="post" className="ajaxFormSubmit"><div className="row"><div className="col-lg-2"><div className="form-group"><label>Account Type</label> <select className="form-control"><option value="0">All</option> <option value="1">Deposit/Withdraw Report</option> <option value="2">Sports Report</option> <option value="3">Casino Report</option> <option value="4">Third Party Casino Report</option></select></div></div>  <div className="col-lg-2"><div className="form-group"><label>Game Name</label> <select className="form-control"><option value="allbalance">All</option></select></div></div>  <div className="col-lg-2"><div className="form-group user-lock-search relative"><label htmlFor="d-inline-block">Search By Client Name</label> <div tabIndex="-1" role="combobox" aria-owns="listbox-null" className="multiselect"><div className="multiselect__select"></div>
          <div className="multiselect__tags"><div className="multiselect__tags-wrap hidden"></div>  <div className="multiselect__spinner !hidden"></div> <input name="" type="text" autoComplete="off" spellCheck="false" placeholder="Select option" tabIndex="0" aria-controls="listbox-null" className="multiselect__input w-0 p-0 absolute" onFocus={() => setShowMessage(true)} onBlur={() => setShowMessage(false)} /> </div>

          {
            showMessage &&
            (<div tabIndex="-1" className="multiselect__content-wrapper max-h-[300px] hidden"><ul role="listbox" id="listbox-null" className="multiselect__content block">   <li className='hidden'><span className="multiselect__option">No elements found. Consider changing the search query.</span></li> <li><span className="multiselect__option">List is empty.</span></li> </ul></div>)}

        </div></div></div> <div className="col-lg-2 statement mb-3"><label>From</label> <DatePickerModal /></div> <div className="col-lg-2 statement mb-3"><label>To</label> <DatePickerModal /></div></div> <div className="row"><div className="col-lg-2"><button type="submit" id="loaddata" className="btn btn-primary">Load</button></div></div></form></div>

        <div className="row mt-3"><div className="col-sm-12 col-md-6"><div id="tickets-table_length" className="dataTables_length"><label className="d-inline-flex items-center text-[14px]">
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

          <div class="table-responsive mb-0 mt-2 report-table account-table"><div class="table no-footer table-hover table-responsive-sm"><table id="accStmtTable" role="table" aria-busy="false" aria-colcount="6" class="table b-table table-striped table-bordered">
          <thead role="rowgroup" class=""><tr role="row" class=""><th role="columnheader" scope="col" tabIndex="0" aria-colindex="1" aria-sort="none" class="position-relative"><div>Date</div><span class="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="2" aria-sort="none" class="position-relative text-right"><div>Credit</div><span class="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="3" aria-sort="none" class="position-relative text-right"><div>Debit</div><span class="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="4" aria-sort="none" class="position-relative text-right"><div>Closing</div><span class="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="5" aria-sort="none" class="position-relative"><div>Description</div><span class="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="6" aria-sort="none" class="position-relative"><div>Fromto</div><span class="sr-only"> (Click to sort ascending)</span></th></tr></thead>
          <tbody role="rowgroup"><tr role="row" class="b-table-empty-row"><td colspan="6" role="cell" class=""><div role="alert" aria-live="polite"><p class="text-center mb-0">No data available in table</p></div></td></tr></tbody>
          </table></div></div>

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

export default AccountStatement