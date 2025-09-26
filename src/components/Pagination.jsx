import React from "react";

const Pagination = ({ currentPage, totalPages, goToPage }) => {
    if (totalPages <= 1) return null;

    return (
              <div className="dataTables_paginate paging_simple_numbers float-right">
                          <ul className="pagination pagination-rounded mb-0">
                            <li
                              className={`page-item ${currentPage === 1 ? "disabled" : ""
                                }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => goToPage(1)}
                              >
                                «
                              </button>
                            </li>
                            <li
                              className={`page-item ${currentPage === 1 ? "disabled" : ""
                                }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => goToPage(currentPage - 1)}
                              >
                                ‹
                              </button>
                            </li>

                            {Array.from({ length: totalPages }, (_, i) => (
                              <li
                                key={i}
                                className={`page-item ${currentPage === i + 1 ? "active" : ""
                                  }`}
                              >
                                <button role="menuitemradio" type="button" aria-label="Go to page 1" aria-checked="true" aria-posinset="1" aria-setsize="1" tabindex="0" class="page-link btn-primary"
                                  // className="page-link"
                                  onClick={() => goToPage(i + 1)}
                                >
                                  {i + 1}
                                </button>
                              </li>
                            ))}

                            <li
                              className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => goToPage(currentPage + 1)}
                              >
                                ›
                              </button>
                            </li>
                            <li
                              className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => goToPage(totalPages)}
                              >
                                »
                              </button>
                            </li>
                          </ul>
                        </div>
    );
};

export default Pagination;
