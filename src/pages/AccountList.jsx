import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import Cookies from "universal-cookie";
import useApi from '../components/hooks/useApi';
import AddAccount from '../components/AddAccount';
import DepositModal from '../components/DepositModal';
import WithdrawModal from '../components/WithdrawModal';
import ExposureLimitModal from '../components/ExposureLimitModal';
import CarditModal from '../components/CarditModal';
import PasswordModal from '../components/PasswordModal';
import ChangeStatusModal from '../components/ChangeStatusModal';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Loading from '../components/Loading';
import { saveAs } from "file-saver";
import ExportButtons from '../components/Export';

const AccountList = () => {
    const [accountList, setAccountList] = useState([]);
    const [addAccount, setAddAccount] = useState(false);
    const [userBalance, setUserBalance] = useState(false);
    const [activeTab, setActiveTab] = useState("active-user");
    const [entriesPerPage, setEntriesPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [expandedMaster, setExpandedMaster] = useState(null);
    const [childList, setChildList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserW, setSelectedUserW] = useState(null);
    const [selectedUserl, setSelectedUserl] = useState(null);
    const [selectedUserm, setSelectedUserm] = useState(null);
    const [selectedUserp, setSelectedUserp] = useState(null);
    const [selectedUserc, setSelectedUserc] = useState(null);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showExposureModal, setShowExposureModal] = useState(false);
    const [showcraditModal, setShowCraditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const cookies = new Cookies();
    const userData = cookies.get("user");
    const parentId = userData?._id;
    const { apiCall } = useApi();

    const capitalizeFirst = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

    const fetchActiveUsers = async (page = 1, limit = entriesPerPage, search = "") => {
        setLoading(true);
        try {
            const token = cookies.get("auth-token");
            const result = await apiCall(
                "GET",
                `user/active_child_list?search=${search}&page=${page}&limit=${limit}`,
                null,
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            );

            if (result && result.success) {
                setAccountList(result.data || []);
                setTotalRecords(result.totalCount || 0);
                setCurrentPage(page);
            } else {
                setAccountList([]);
                setTotalRecords(0);
            }
        } catch (err) {
            console.error("Error fetching active users:", err);
            setAccountList([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchInactiveUsers = async (page = 1, limit = entriesPerPage, search = "") => {
        setLoading(true);
        try {
            const token = cookies.get("auth-token");
            const result = await apiCall(
                "GET",
                `user/inactive_child_list?search=${search}&page=${page}&limit=${limit}`,
                null,
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            );

            if (result && result.success) {
                setAccountList(result.data || []);
                setTotalRecords(result.totalCount || 0);
                setCurrentPage(page);
            } else {
                setAccountList([]);
                setTotalRecords(0);
            }
        } catch (err) {
            console.error("Error fetching inactive users:", err);
            setAccountList([]);
        } finally {
            setLoading(false);
        }
    };

    const exportData = async (type) => {
        try {
            const token = cookies.get("auth-token");
            const isActive = activeTab === "active-user";
            const endpoint = isActive
                ? "active_child_list_export"
                : "inactive_child_list_export";

            const result = await apiCall("GET", `user/${endpoint}`, null, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            });

            const data = Array.isArray(result?.data) ? result.data : [];

            const columnMap = {
                username: "User Name",
                fullName: "Full Name",
                credit: "Credit Reference",
                deposit: "Pts",
                profitLossBalance: "Client(P/L)",
                exposure: "Exposure",
                availablePts: "Available Pts",
                isActive: "U st",
                isBetAllowed: "B st",
                exposerLimit: "Exposure Limit",
                defaultPercentage: "Default(%)",
                role: "Account Type",
            };

            const headers = Object.values(columnMap);

            const rows =
                data.length > 0
                    ? data.map((row) =>
                        Object.keys(columnMap).map((key) => {
                            if (key === "availablePts") {
                                return (
                                    Number(row.deposit || 0) +
                                    Number(row.profitLossBalance || 0) +
                                    Number(row.exposure || 0)
                                );
                            }
                            if (key === "defaultPercentage") {
                                return row[key] != null && row[key] !== "" ? row[key] : 0;
                            }
                            if (key === "isActive" || key === "isBetAllowed") {
                                return row[key] ? "Yes" : "No";
                            }
                            return row[key] ?? "";
                        })
                    )
                    : [];

            if (type === "csv") {
                const csvHeaders = headers.join(",");
                const csvRows = rows
                    .map((r) => r.map((val) => `"${val}"`).join(","))
                    .join("\n");
                const csvContent = [csvHeaders, csvRows].join("\n");

                const blob = new Blob([csvContent], {
                    type: "text/csv;charset=utf-8;",
                });
                saveAs(blob, "userlist.csv");
            } else if (type === "pdf") {
                const doc = new jsPDF("l", "pt", "a4");

                const pageWidth = doc.internal.pageSize.getWidth();
                doc.setFontSize(14);
                doc.text("User List", pageWidth / 2, 30, { align: "center" });

                autoTable(doc, {
                    head: [headers],
                    body: rows,
                    startY: 50,
                    theme: "grid",
                    tableWidth: "auto",
                    margin: { left: 10, right: 10 },
                    headStyles: {
                        fillColor: [41, 128, 185],
                        textColor: 255,
                        halign: "center",
                    },
                    styles: { fontSize: 8, cellPadding: 4, overflow: "linebreak" },
                    columnStyles: {
                        0: { cellWidth: 70 },
                        1: { cellWidth: 90 },
                        2: { cellWidth: 90 },
                        3: { cellWidth: 50 },
                        4: { cellWidth: 70 },
                        5: { cellWidth: 70 },
                        6: { cellWidth: 90 },
                        7: { cellWidth: 45 },
                        8: { cellWidth: 45 },
                        9: { cellWidth: 90 },
                        10: { cellWidth: 70 },
                        11: { cellWidth: 50 },
                    },
                });
                doc.save("userlist.pdf");
            }
        } catch (error) {
            console.error("Export Error:", error);
        }
    };



    useEffect(() => {
        if (activeTab === "active-user") {
            fetchActiveUsers(currentPage, entriesPerPage);
        } else if (activeTab === "deactive-user") {
            fetchInactiveUsers(currentPage, entriesPerPage);
        }
    }, [activeTab, entriesPerPage, currentPage, parentId]);


    const handleSearch = () => {
        setCurrentPage(1);
        if (activeTab === "active-user") {
            fetchActiveUsers(1, entriesPerPage, searchTerm);
        } else {
            fetchInactiveUsers(1, entriesPerPage, searchTerm);
        }
    };

    const handleReset = () => {
        setSearchTerm("");
        setCurrentPage(1);
        if (activeTab === "active-user") {
            fetchActiveUsers(1, entriesPerPage, "");
        } else {
            fetchInactiveUsers(1, entriesPerPage, "");
        }
    };

    const handleClose = () => {
        setShowDepositModal(false);
        setShowWithdrawModal(false);
        setShowExposureModal(false);
        setShowCraditModal(false);
        setShowPasswordModal(false);
        setShowChangeStatusModal(false);
    }
    const updateAccountList = (userId, newLimit) => {
        setAccountList(prev =>
            prev.map(user =>
                user._id === userId ? { ...user, exposerLimit: newLimit } : user
            )
        );
    };

    // const totalPages = Math.ceil(accountList.length / entriesPerPage);

    const totalPages = Math.ceil(totalRecords / entriesPerPage);

    const paginatedData = accountList.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );


    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };


    return (
        <div className='w-full'>
            {addAccount ? (
                <AddAccount onBack={() => setAddAccount(false)} />
            ) : (
                <div data-v-61537a09 className='listing-grid !bg-[#f9f9f9]'>
                    <div className="master-balance">
                        <div className="text-center">
                            <div id="user-balance" className={`far  ${userBalance ? 'rotate-0' : 'rotate-180'}`}>
                                <Icon icon='ic:round-arrow-circle-up' width="24" height="24" style={{ color: '#fff' }} onClick={() => setUserBalance(!userBalance)} />
                            </div>
                            {/* <span   className="far fa-arrow-alt-circle-down"></span> */}
                        </div>
                        {userBalance && (
                            <div id="master-balance-detail" className="master-balance-detail mt-3"><ul className="row"><li className="col-md-4"><label className="col-md-8 text-left">Upper Level Credit Referance:</label> <span className="text-right col-md-4">0</span></li> <li className="col-md-4"><label className="col-md-8 text-left">Down level Occupy Balance:</label> <span className="text-right col-md-4">0</span></li> <li className="col-md-4"><label className="col-md-8 text-left">Down Level Credit Referance:</label> <span className="text-right col-md-4">200</span></li> <li className="col-md-4"><label className="col-md-8 text-left">Total Master Balance</label> <span className="text-right col-md-4">0</span></li> <li className="col-md-4"><label className="col-md-8 text-left">Upper Level:</label> <span className="text-right col-md-4">0</span></li> <li className="col-md-4"><label className="col-md-8 text-left">Down Level Profit/Loss :</label> <span className="text-right col-md-4">-200</span></li> <li className="col-md-4"><label className="col-md-8 text-left">Available Balance:</label> <span className="text-right col-md-4">0</span></li> <li className="col-md-4"><label className="col-md-8 text-left">Available Balance With Profit/Loss:</label> <span className="text-right col-md-4">0</span></li> <li className="col-md-4"><label className="col-md-8 text-left">My Profit/Loss:</label> <span className="text-right col-md-4">0</span></li></ul></div>
                        )}

                    </div>
                    <div className='row mt-2'>
                        <div className='col-12'>
                            <div className='page-title-box flex items-center justify-between pb-3'>
                                <h4 className='mb-0 text-[18px]'>Account List</h4>
                                <div className='page-title-right'>
                                    {/* <div className='inline-block'> */}
                                    <div className='inline-block' onClick={() => setAddAccount(true)}>
                                        <a className='btn btn-primary'> Add Account</a>
                                        {/* <a href="" className='btn btn-primary'  onClose={() => setAddAccount(false)}> Add Account</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row account-list'>
                        <div className='col-12'>
                            <div className='card'>
                                <div className='card-body'>

                                    <div className="row"><div className="col-sm-12 col-md-6"><div id="tickets-table_length" className="dataTables_length"><label className="d-inline-flex items-center text-[14px]">
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
                                        <input name="searchuser" type="search" placeholder="Search..." className="form-control form-control-sm ml-2 form-control !text-[14px] !leading-[15px]" value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)} id="__BVID__250" /> <button type="submit" id="loaddata" className="btn btn-primary ml-2" onClick={handleSearch}>Load</button> <button type="submit" id="loaddata" className="btn btn-secondary ml-2" onClick={handleReset}>Reset</button></label></div></div></div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tabs" id="__BVID__1077"><div className="account-list"><ul role="tablist" className="nav nav-tabs" id="__BVID__1077__BV_tab_controls_"><li role="presentation" className="nav-item"><a role="tab" aria-selected="true" aria-setsize="2" aria-posinset="1" href="#" target="_self" className={`nav-link ${activeTab === "active-user" ? 'active' : ''}`} id="__BVID__1078___BV_tab_button__" aria-controls="__BVID__1078" onClick={() => setActiveTab("active-user")}>Active Users</a></li><li role="presentation" className="nav-item"><a role="tab" tabIndex="-1" aria-selected="false" aria-setsize="2" aria-posinset="2" href="#" target="_self" className={`nav-link ${activeTab === "deactive-user" ? 'active ' : ''}`} id="__BVID__1080___BV_tab_button__" aria-controls="__BVID__1080" onClick={() => setActiveTab("deactive-user")}>Deactive Users</a></li></ul></div><div className="tab-content text-muted" id="__BVID__1077__BV_tab_container_"><div role="tabpanel" aria-hidden="false" className="tab-pane active" id="__BVID__1078" aria-labelledby="__BVID__1078___BV_tab_button__"></div> <div role="tabpanel" aria-hidden="true" className="tab-pane" id="__BVID__1080" aria-labelledby="__BVID__1080___BV_tab_button__ hidden" ></div></div></div>

                    <div className="table-responsive mb-0">
                        <div className="d-inline-block mr-2 my-3">
                            {/* <button type="button" className="btn buttons-pdf btn-danger !bg-[#cb0606] hover:!bg-[#f14646]" onClick={() => exportData("pdf")}>
                                <Icon icon="prime:file-pdf" width="24" height="24" style={{ color: '#fff', display: 'inline' }} />PDF
                            </button> */}
                            <ExportButtons exportData={exportData} />
                             <div id="export_1756880630281" className="d-inline-block">
                                {/* <button type="button" className="btn buttons-excel btn-success !bg-[#217346] hover:!bg-[#2ca579]" onClick={() => exportData("csv")}>
                                    <Icon icon="prime:file-excel" width="24" height="24" style={{ color: '#fff', display: 'inline' }} />Excel
                                </button> */}
                             
                                </div>
                                </div> <div className="table no-footer list-clients table-responsive-sm">
                            <table id="eventsListTbl" role="table" aria-busy="false" aria-colcount="12" className="table b-table table-striped table-bordered"><thead role="rowgroup" className=""><tr role="row" className=""><th role="columnheader" scope="col" tabIndex="0" aria-colindex="1" aria-sort="none" className="position-relative"><div>User Name</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="2" aria-sort="none" className="position-relative text-right"><div>Credit Referance</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="3" aria-sort="none" className="position-relative text-right"><div>Balance</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="4" aria-sort="none" className="position-relative text-right"><div>Client(P/L)</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" aria-colindex="5" className="text-right"><div>Exposure</div></th><th role="columnheader" scope="col" aria-colindex="6" className="text-right"><div>Available Balance</div></th><th role="columnheader" scope="col" aria-colindex="7" className=""><div>U st</div></th><th role="columnheader" scope="col" aria-colindex="8" className=""><div>B st</div></th><th role="columnheader" scope="col" aria-colindex="9" className=""><div>Exposure Limit</div></th><th role="columnheader" scope="col" aria-colindex="10" className=""><div>Default(%)</div></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="11" aria-sort="none" className="position-relative"><div>Account Type</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" aria-colindex="12" className=""><div>Action</div></th></tr></thead>
                                <tbody role="rowgroup">

                                    <tr role="row" className="">
                                        <td aria-colindex="1" role="cell" className=""></td>
                                        <td aria-colindex="2" role="cell" className=""><p className="text-right mb-0 cp">200</p></td>
                                        <td aria-colindex="3" role="cell" className=""><p className="text-right mb-0">0</p></td>
                                        <td aria-colindex="4" role="cell" className=""><p className="text-right mb-0">-200</p></td>
                                        <td aria-colindex="5" role="cell" className="text-right"><a href="javascript:void(0)" className="text-right mb-0"></a></td>
                                        <td aria-colindex="6" role="cell" className=""><p className="text-right mb-0">0</p></td>
                                        <td aria-colindex="7" role="cell" className=""></td><td aria-colindex="8" role="cell" className=""></td>
                                        <td aria-colindex="9" role="cell" className=""></td>
                                        <td aria-colindex="10" role="cell" className=""><p className="text-left mb-0">

                                        </p></td><td aria-colindex="11" role="cell" className=""></td><td aria-colindex="12" role="cell" className=""><div role="group" className="btn-group"></div></td></tr>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="12" className="text-center py-4">
                                                <Loading />
                                            </td>
                                        </tr>
                                    ) : accountList.length === 0 ? (
                                        <tr role="row" className="">
                                            <td colSpan="12" className="text-center py-4 text-gray-500">
                                                No data found
                                            </td>
                                        </tr>
                                    ) : (

                                        accountList.map((item, index) => (
                                            <tr key={index} role="row" className=""><td aria-colindex="1" role="cell" className="">
                                                {/* <span title="demo12v" className="wrape-text">{item.username}</span> */}
                                                {item.role !== "user" ? (
                                                    <div className="relative group inline-block">
                                                        <span
                                                            className="wrape-text text-gray-500 cursor-pointer"
                                                            onClick={() => window.open(`/admin/child1/${item._id}`, "_blank")}
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
                                            </td><td aria-colindex="2" role="cell" className=""><p className="text-right mb-0 cp">{item.credit || 0}</p></td><td aria-colindex="3" role="cell" className=""><p className="text-right mb-0">{item.deposit}</p></td><td aria-colindex="4" role="cell" className=""><p className="text-right mb-0">{item.profitLossBalance
                                            }</p></td><td aria-colindex="5" role="cell" className="text-right"><p className="mb-0 text-right">{item.exposure}</p></td><td aria-colindex="6" role="cell" className=""><p className="text-right mb-0"> {Number(item.deposit || 0) + Number(item.profitlossbalance || 0) + Number(item.exposure || 0)}</p></td><td aria-colindex="7" role="cell" className=""><div className="mb-1 custom-control custom-checkbox"><input type="checkbox" disabled="disabled" className="custom-control-input" value="true" id="__BVID__1165" checked={item.isActive} /><label className="custom-control-label" htmlFor="__BVID__1165"></label></div></td><td aria-colindex="8" role="cell" className=""><div className="mb-1 custom-control custom-checkbox"><input type="checkbox" disabled="disabled" className="custom-control-input" value="true" id="__BVID__1166" checked={item.isBetAllowed} /><label className="custom-control-label" htmlFor="__BVID__1166"></label></div></td><td aria-colindex="9" role="cell" className="">{item.exposerLimit}</td><td aria-colindex="10" role="cell" className=""><p className="text-left mb-0">
                                                {item.defaultPersentage || 0}
                                            </p></td><td aria-colindex="11" role="cell" className="">{capitalizeFirst(item.role)}</td><td aria-colindex="12" role="cell" className=""><div role="group" className="btn-group"><button type="button" className="btn action-button btn-secondary hover:!bg-[#636678] !bg-[#444]" onClick={() => {
                                                setSelectedUser(item);
                                                setShowDepositModal(true);
                                            }}>D</button>
                                                <button type="button" className="btn action-button btn-secondary hover:!bg-[#636678] !bg-[#444]" onClick={() => { setSelectedUserW(item); setShowWithdrawModal(true) }}>W</button>
                                                <button type="button" className="btn action-button btn-secondary hover:!bg-[#636678] !bg-[#444]" onClick={() => { setSelectedUserl(item); setShowExposureModal(true) }}>L</button> <button type="button" className="btn action-button btn-secondary hover:!bg-[#636678] !bg-[#444]" onClick={() => { setSelectedUserc(item); setShowCraditModal(true) }}>C</button> <button type="button" className="btn action-button btn-secondary hover:!bg-[#636678] !bg-[#444]" onClick={() => { setSelectedUserp(item); setShowPasswordModal(true) }}>P</button> <button type="button" className="btn action-button btn-secondary hover:!bg-[#636678] !bg-[#444]" onClick={() => { setSelectedUserm(item); setShowChangeStatusModal(true) }}>S</button></div></td></tr>
                                            // ))}

                                        ))
                                    )}

                                </tbody></table></div></div>
                    <div className="row pt-3"><div className="col"><div className="dataTables_paginate paging_simple_numbers float-right"><ul className="pagination pagination-rounded mb-0"><ul role="menubar" aria-disabled="false" aria-label="Pagination" className="pagination dataTables_paginate paging_simple_numbers my-0 b-pagination justify-content-end"><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to first page" aria-disabled="true" className={`page-link ${currentPage === 1 ? "disabled" : ""}`}>«</span></li><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to previous page" aria-disabled="true" className={`page-link ${currentPage === 1 ? "disabled" : ""}`} onClick={() => goToPage(currentPage - 1)}>‹</span></li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} role="presentation" className={`page-item ${currentPage === i + 1 ? "active" : ""
                                }`}><button role="menuitemradio" type="button" aria-label="Go to page 1" aria-checked="true" aria-posinset="1" aria-setsize="1" tabIndex="0" className="page-link btn-primary" onClick={() => goToPage(i + 1)}>{i + 1}</button></li>
                        ))}
                        <li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to next page" aria-disabled="true" className="page-link">›</span></li><li role="presentation" aria-hidden="true" className="page-item disabled"><span role="menuitem" aria-label="Go to last page" aria-disabled="true" className="page-link">»</span></li></ul></ul></div></div></div>

                    {showDepositModal && <DepositModal onClose={handleClose} selectedUser={selectedUser} />}
                    {showWithdrawModal && <WithdrawModal onClose={handleClose} selectedUserW={selectedUserW} />}
                    {showExposureModal && <ExposureLimitModal onClose={handleClose} selectedUserl={selectedUserl} setSelectedUserl={setSelectedUserl} updateAccountList={updateAccountList} />}
                    {showcraditModal && <CarditModal onClose={handleClose} selectedUserc={selectedUserc}
                        updateAccountListCredit={(userId, newCredit) => {
                            setAccountList((prev) =>
                                prev.map((user) =>
                                    user._id === userId ? { ...user, credit: newCredit } : user
                                )
                            );
                        }} />}
                    {showPasswordModal && <PasswordModal onClose={handleClose} selectedUserp={selectedUserp}
                        updateAccountList2={(userId, updatedData) => {
                            setAccountList((prev) =>
                                prev.map((user) =>
                                    user._id === userId ? { ...user, ...updatedData } : user
                                )
                            );
                        }} />}
                    {showChangeStatusModal && <ChangeStatusModal onClose={handleClose} selectedUserm={selectedUserm} updateAccountList1={(userId, updatedData) => {
                        setAccountList((prev) =>
                            prev.map((user) =>
                                user._id === userId ? { ...user, ...updatedData } : user
                            )
                        );
                    }} />}
                </div>
            )}
        </div>
    )
}

export default AccountList