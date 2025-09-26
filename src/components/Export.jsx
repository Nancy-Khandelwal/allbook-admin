import React from "react";
import { Icon } from "@iconify/react";

const ExportButtons = ({ exportData }) => {
    return (
        <div className="d-inline-block mr-2 my-3">
            <button
                type="button"
                className="btn buttons-pdf btn-danger !bg-[#cb0606] hover:!bg-[#f14646] mr-2"
                onClick={() => exportData("pdf")}
            >
                <Icon icon="prime:file-pdf" width="24" height="24" style={{ color: '#fff', display: 'inline' }} /> PDF
            </button>
            <button
                type="button"
                className="btn buttons-excel btn-success !bg-[#217346] hover:!bg-[#2ca579]"
                onClick={() => exportData("csv")}
            >
                <Icon icon="prime:file-excel" width="24" height="24" style={{ color: '#fff', display: 'inline' }} /> Excel
            </button>
        </div>
    );
};

export default ExportButtons;
