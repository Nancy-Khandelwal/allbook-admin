import React, { useEffect, useState } from 'react'
import Cookies from "universal-cookie";
import DepositModal from '../components/DepositModal';
import WithdrawModal from '../components/WithdrawModal';
import ExposureLimitModal from '../components/ExposureLimitModal';
import CarditModal from '../components/CarditModal';
import PasswordModal from '../components/PasswordModal';
import ChangeStatusModal from '../components/ChangeStatusModal';
import useApi from '../components/hooks/useApi';
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Loading from '../components/Loading';
import ExportButtons from '../components/Export';

const ActiveChildList = () => {
  const { parentId } = useParams();
  const [inactiveChildList, setInactiveChildList] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(25);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserW, setSelectedUserW] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showExposureModal, setShowExposureModal] = useState(false);
  const [showcraditModal, setShowCraditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUserl, setSelectedUserl] = useState(null);
  const [selectedUserm, setSelectedUserm] = useState(null);
  const [selectedUserp, setSelectedUserp] = useState(null);
  const [selectedUserc, setSelectedUserc] = useState(null);
  const cookies = new Cookies();
  const { apiCall } = useApi();
  const capitalizeFirst = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };


  // const totalPages = Math.max(1, Math.ceil(inactiveChildList.length / entriesPerPage));

  // const paginatedData = inactiveChildList.slice(
  //     (currentPage - 1) * entriesPerPage,
  //     currentPage * entriesPerPage
  // );

  const fetchInactiveChildList = async (search) => {
    setLoading(true);
    try {
      const token = cookies.get("auth-token");
      const params = new URLSearchParams({
        parentId,
        search: search || '',
        page: currentPage,
        limit: entriesPerPage,
      });

      const result = await apiCall(
        "GET",
        `user/active_child_list?${params.toString()}`,
        null,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );

      if (result?.success && Array.isArray(result.data)) {
        setInactiveChildList(result.data);
        setTotalPages(result.totalPages || 1);
      } else {
        setInactiveChildList([]);
      }
    } catch (err) {
      console.error("Error fetching active child list:", err);
      setInactiveChildList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInactiveChildList(lastSearchTerm);
  }, [parentId, currentPage, entriesPerPage, lastSearchTerm]);

  const updateinactiveChildList = (userId, newLimit) => {
    setInactiveChildList(prev =>
      prev.map(user =>
        user._id === userId ? { ...user, exposerLimit: newLimit } : user
      )
    );
  };


  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLoadSearch = () => {
    setCurrentPage(1); // reset to page 1
    setLastSearchTerm(searchTerm); // trigger effect
  };

  const resetSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    setLastSearchTerm('');
  };
  const paginatedData = inactiveChildList;
  const handleClose = () => {
    setShowDepositModal(false);
    setShowWithdrawModal(false);
    setShowExposureModal(false);
    setShowCraditModal(false);
    setShowPasswordModal(false);
    setShowChangeStatusModal(false);
  };
  const exportData = async (type = "csv") => {
    try {
      const token = cookies.get("auth-token");

      const params = new URLSearchParams({
        parentId,
        search: lastSearchTerm || '',
        page: currentPage,
        limit: entriesPerPage,
      });

      const response = await apiCall(
        "GET",
        `user/active_child_list_export?${params.toString()}`,
        null,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );

      const list = Array.isArray(response.data) ? response.data : [];

      const columnMap = {
        username: "Username",
        credit: "Credit Reference",
        isActive: "Ust",
        isBetAllowed: "Bst",
        exposerLimit: "ExposureLimit",
        default: "Default (%)",
        role: "Account Type",
      };

      const headers = Object.values(columnMap);
      const rows = list.map((row) =>
        Object.keys(columnMap).map((key) => row[key] ?? "")
      );

      if (type === "csv") {
        const csvHeaders = headers.join(",");
        const csvRows = rows.map((r) => r.map((val) => `"${val}"`).join(",")).join("\n");
        const csvContent = [csvHeaders, csvRows].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "userlist.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

      } else if (type === "pdf") {
        const doc = new jsPDF();

        // Center the heading
        const title = "User List";
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(title);
        const x = (pageWidth - textWidth) / 2;
        doc.text(title, x, 15);

        autoTable(doc, {
          head: [headers],
          body: rows.length > 0 ? rows : [["", "", "", "", "", "", ""]],
          startY: 20,
          styles: { fontSize: 10 },
        });

        doc.save("userlist.pdf");
      }
    } catch (error) {
      console.error("Export Error:", error);
    }
  };



  return (
    <div className='w-full p-3'>
      {(showDepositModal || showWithdrawModal || showExposureModal || showcraditModal || showPasswordModal || showChangeStatusModal) && (<div id="__BVID__241___BV_modal_backdrop_" className="modal-backdrop"></div>)}
      {/* {
                addAccount ? (
                    <AddAccount />
                ) : ( */}
      <div className='listing-grid'>
        <div className='row'>
          <div className='col-12'>
            <div className='page-title-box flex items-center justify-between pb-0'>
              <h4 className='mb-0 text-[18px]'>Account List</h4>
              <div className='page-title-right'>
                {/* <div className='inline-block' onClick={() => setAddAccount(true)}>
                                    <a className='btn btn-primary'> Add Account</a>
                                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className='row account-list'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-body'>
                <div className="row row5">
                  <div className="col-md-6 mb-2 search-form">
                    <div className="d-inline-block mr-2">
                  {/* <button type="button" className="btn buttons-pdf btn-danger !bg-[#cb0606] hover:!bg-[#f14646]" onClick={() => exportData("pdf")}>
                    <i className="far fa-file-pdf mr-1"></i>PDF
                  </button>  */}
                  <ExportButtons exportData={exportData} />
                  <div id="export_1756727337031" className="d-inline-block">
                    {/* <button type="button" className="btn buttons-excel btn-success inline-block !bg-[#217346] hover:!bg-[#2ca579]" onClick={() => exportData("csv")}>
                      <i className="far fa-file-excel mr-1"></i>Excel
                    </button> */}
                    </div>
                    </div>
                    </div> 
                    <div className="col-md-6 text-right mb-2"></div></div>
                <div className="row"><div className="col-sm-12 col-md-6"><div id="tickets-table_length" className="dataTables_length"><label className="d-inline-flex items-center text-[14px] leading-[15px]">
                  Show&nbsp;
                  <select className="custom-select custom-select-sm" id="__BVID__249"
                    value={entriesPerPage}
                    onChange={(e) => {
                      setEntriesPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >{[25, 50, 100, 250, 500, 750, 1000].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}</select>&nbsp;entries
                </label></div></div> <div className="col-sm-12 col-md-6"><div id="tickets-table_filter" className="dataTables_filter text-md-right"><label className="d-inline-flex items-center text-[14px] leading-[15px]">
                  Search:
                  <input name="searchuser" type="search" placeholder="Search..." className="form-control form-control-sm ml-2 form-control !text-[14px] !leading-[15px]" value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} id="__BVID__250" /> <button type="submit" id="loaddata" className="btn btn-primary ml-2" onClick={handleLoadSearch}>Load</button> <button type="submit" id="loaddata" className="btn btn-secondary ml-2" onClick={resetSearch}>Reset</button></label></div></div></div>
                <div className="table-responsive mb-0"><div className="table no-footer list-clients table-responsive-sm"><table id="eventsListTbl" role="table" aria-busy="false" aria-colcount="8" className="table b-table table-striped table-bordered"><thead role="rowgroup" className=""><tr role="row" className="">
                  <th role="columnheader" scope="col" tabIndex="0" aria-colindex="1" aria-sort="none" className="position-relative"><div>User Name</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="2" aria-sort="none" className="position-relative text-right"><div>Credit Referance</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" aria-colindex="3" className=""><div>U st</div></th><th role="columnheader" scope="col" aria-colindex="4" className=""><div>B st</div></th><th role="columnheader" scope="col" aria-colindex="5" className=""><div>Exposure Limit</div></th><th role="columnheader" scope="col" aria-colindex="6" className=""><div>Deafult (%)</div></th><th role="columnheader" scope="col" aria-colindex="7" className=""><div>Account Type</div></th><th role="columnheader" scope="col" aria-colindex="8" className=""><div>Action</div></th></tr></thead>
                  <tbody role="rowgroup"><tr role="row" className=""><td aria-colindex="1" role="cell" className="">
                  </td><td aria-colindex="2" role="cell" className="">
                      <p className="text-right mb-0 cp">200</p></td>
                    <td aria-colindex="3" role="cell" className=""></td>
                    <td aria-colindex="4" role="cell" className=""></td>
                    <td aria-colindex="5" role="cell" className=""></td>
                    <td aria-colindex="6" role="cell" className=""><p className="text-left mb-0"></p></td>
                    <td aria-colindex="7" role="cell" className=""></td>
                    <td aria-colindex="8" role="cell" className=""><div role="group" className="btn-group"></div>
                    </td></tr>
                    {/* {paginatedData.length === 0 ? (
    <tr>
      <td colSpan="8" className="text-center py-3">
        No data found
      </td>
    </tr>
  ) : (
                                            paginatedData.map((item, index) => ( */}
                    {loading ? (
                      <tr>
                        <td colSpan="12" className="text-center py-4">
                          <Loading />
                        </td>
                      </tr>
                    ) : inactiveChildList.length === 0 ? (
                      <tr role="row" className="">
                        <td colSpan="12" className="text-center py-4 text-gray-500">
                          No data found
                        </td>
                      </tr>
                    ) : (

                      inactiveChildList.map((item, index) => (
                        <tr key={index} role="row" className="">
                          <td aria-colindex="1" role="cell" className="">

                            {/* {item.role !== "user" ? (
    <span
        title={item.username}
        className="wrape-text cursor-pointer text-blue-600 hover:underline"
        onClick={() => window.open(`d/${item._id}`, '_blank')}
    >
        {item.username}
    </span>
) : (
    <span title={item.username} className="wrape-text text-gray-500 cursor-not-allowed">
        {item.username}
    </span>
)} */}
                            {item.role !== "user" ? (
                              <div className="relative group inline-block">
                                <span
                                  className="wrape-text text-gray-500 cursor-pointer"
                                  onClick={() => window.open(`/admin/child/${item._id}`, "_blank")}
                                >
                                  {item.username}
                                </span>


                                <span
                                  className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden 
                 group-hover:inline-block bg-black text-white text-xs rounded 
                 px-2 py-1 whitespace-nowrap z-10"
                                >
                                  {item.username}
                                </span>
                              </div>
                            ) : (

                              <span
                                className="wrape-text "
                                title={item.username}
                              >
                                {item.username}
                              </span>
                            )}

                          </td>
                          <td aria-colindex="2" role="cell" className=""><p className="text-right mb-0 cp">0</p></td><td aria-colindex="3" role="cell" className=""><div className="mb-1 custom-control custom-checkbox"><input type="checkbox" disabled="disabled" className="custom-control-input" value="true" checked={item.isActive}
                            id={`ust-${index}`} /><label className="custom-control-label" htmlFor="__BVID__276"></label></div></td><td aria-colindex="4" role="cell" className=""><div className="mb-1 custom-control custom-checkbox"><input type="checkbox" disabled="disabled" className="custom-control-input" value="true" checked={item.isBetAllowed}
                              id={`bst-${index}`} /><label className="custom-control-label" htmlFor="__BVID__277"></label></div></td><td aria-colindex="5" role="cell" className="">{item.exposerLimit}</td><td aria-colindex="6" role="cell" className=""><p className="text-left mb-0">0</p></td><td aria-colindex="7" role="cell" className="">{capitalizeFirst(item.role)}</td><td aria-colindex="8" role="cell" className=""><div role="group" className="btn-group">
                                {/* <button type="button" className="btn action-button !text-[#eff2f7] hover:!bg-[#636678] !bg-[#444]" onClick={() => {
                  setSelectedUser(item); 
                  setShowDepositModal(true);
                }}>D</button> <button type="button" className="btn action-button !text-[#eff2f7] hover:!bg-[#636678] !bg-[#444]" onClick={() =>{setSelectedUserW(item); setShowWithdrawModal(true)}}>W</button>  */}
                                <button type="button" className="btn action-button !text-[#eff2f7] hover:!bg-[#636678] !bg-[#444]" onClick={() => { setSelectedUserl(item); setShowExposureModal(true) }}>L</button>
                                <button type="button" className="btn action-button !text-[#eff2f7] hover:!bg-[#636678] !bg-[#444]" onClick={() => { setSelectedUserc(item); setShowCraditModal(true) }}>C</button>
                                <button type="button" className="btn action-button !text-[#eff2f7] hover:!bg-[#636678] !bg-[#444]" onClick={() => { setSelectedUserp(item); setShowPasswordModal(true) }}>P</button>
                                <button type="button" className="btn action-button !text-[#eff2f7] hover:!bg-[#636678] !bg-[#444]" onClick={() => { setSelectedUserm(item); setShowChangeStatusModal(true) }}>S</button> <button type="button" className="btn action-button !text-[#eff2f7] hover:!bg-[#636678] !bg-[#444]">More</button></div></td></tr>
                        //     ))
                        // }
                      ))
                    )}

                  </tbody></table></div></div>

                <div className="row pt-3"><div className="col"><div className="dataTables_paginate paging_simple_numbers float-right">
                  <ul className="pagination pagination-rounded mb-0"><ul role="menubar" aria-disabled="false" aria-label="Pagination" className="pagination dataTables_paginate paging_simple_numbers my-0 b-pagination justify-content-end"><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to first page" aria-disabled="true" className={`page-link ${currentPage === 1 ? "disabled" : ""}`}>«</span></li><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to previous page" aria-disabled="true" className={`page-link ${currentPage === 1 ? "disabled" : ""}`} onClick={() => goToPage(currentPage - 1)}>‹</span></li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i} role="presentation" className={`page-item ${currentPage === i + 1 ? "active" : ""
                        }`}><button role="menuitemradio" type="button" aria-label="Go to page 1" aria-checked="true" aria-posinset="1" aria-setsize="1" tabIndex="0" className="page-link btn-primary" onClick={() => goToPage(i + 1)}>{i + 1}</button></li>
                    ))}
                    <li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to next page" aria-disabled="true" className="page-link">›</span></li><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to last page" aria-disabled="true" className="page-link">»</span></li></ul></ul>
                </div></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )
            } */}

      {showDepositModal && <DepositModal onClose={handleClose} selectedUser={selectedUser} />}
      {showWithdrawModal && <WithdrawModal onClose={handleClose} selectedUserW={selectedUserW} />}
      {showExposureModal && <ExposureLimitModal onClose={handleClose} selectedUserl={selectedUserl} setSelectedUserl={setSelectedUserl} updateinactiveChildList={updateinactiveChildList} />}
      {showcraditModal && <CarditModal onClose={handleClose} selectedUserc={selectedUserc}
        updateinactiveChildListCredit={(userId, newCredit) => {
          setInactiveChildList((prev) =>
            prev.map((user) =>
              user._id === userId ? { ...user, credit: newCredit } : user
            )
          );
        }} />}
      {showPasswordModal && <PasswordModal onClose={handleClose} selectedUserp={selectedUserp}
        updateinactiveChildList2={(userId, updatedData) => {
          setInactiveChildList((prev) =>
            prev.map((user) =>
              user._id === userId ? { ...user, ...updatedData } : user
            )
          );
        }} />}
      {showChangeStatusModal && <ChangeStatusModal onClose={handleClose} selectedUserm={selectedUserm} updateinactiveChildList1={(userId, updatedData) => {
        setInactiveChildList((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, ...updatedData } : user
          )
        );
      }} />}

    </div>
  );
};

export default ActiveChildList;