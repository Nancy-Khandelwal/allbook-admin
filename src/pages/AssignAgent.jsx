import React from 'react';
import DatePickerModal from '../components/DatePickerModal';

const AssignAgent = () => {
    return (
        <div className='w-full p-3'>
            <div className='row'>
                <div className="col-12"><div className="page-title-box pb-0 flex items-center justify-between"><h4 className="mb-0 text-[18px]">Assign Agent List</h4> <div className="page-title-right"></div></div></div>
            </div>
            <div className="row"><div className="col-12"><div className="card"><div className="card-body"><div className="mb-3"><div className="row row5"></div></div> <div className="row"><div className="col-sm-12 col-md-6"><div id="tickets-table_length" className="dataTables_length"><label className="d-inline-flex align-items-center">
                Show&nbsp;
                <select className="custom-select custom-select-sm" id="__BVID__130"><option value="25">25</option><option value="50">50</option><option value="75">75</option><option value="100">100</option><option value="125">125</option><option value="150">150</option></select>&nbsp;entries
            </label></div></div> <div className="col-sm-12 col-md-6"><div id="tickets-table_filter" className="dataTables_filter text-md-right"><label className="d-inline-flex align-items-center">
                Search:
                <input type="search" placeholder="Search..." className="form-control form-control-sm ml-2 form-control" id="__BVID__131" /></label></div></div></div> <div className="table-responsive mb-0"><div className="table no-footer table-responsive-sm">
                    <table id="eventsListTbl" role="table" aria-busy="false" aria-colcount="6" className="table b-table table-bordered min-w-[750px]"><thead role="rowgroup" className=""><tr role="row" className=""><th role="columnheader" scope="col" tabIndex="0" aria-colindex="1" aria-sort="none" className="relative"><div>S.No.</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="2" aria-sort="none" className="position-relative"><div>User Name</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="3" aria-sort="none" className="relative"><div>Assign Agent Settings</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="4" aria-sort="none" className="relative"><div>Mobile Number</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="5" aria-sort="none" className="relative"><div>Depo Mobile Number</div><span className="sr-only"> (Click to sort ascending)</span></th><th role="columnheader" scope="col" tabIndex="0" aria-colindex="6" aria-sort="none" className="relative"><div>First Bonus Status</div><span className="sr-only"> (Click to sort ascending)</span></th></tr></thead><tbody role="rowgroup"><tr role="row" className="b-table-empty-row"><td colspan="6" role="cell" className=""><div role="alert" aria-live="polite"><div className="text-center my-2">There are no records to show</div></div></td></tr></tbody></table>
                    </div></div>   </div></div></div></div>

            <div className="row"><div className="col-12"><div className="page-title-box flex items-center justify-between pb-0"><h4 className="mb-0 text-[18px]">User Creation</h4> <div className="page-title-right"></div></div></div></div>

            <div className="row"><div className="col-12"><div className="card"><div className="card-body"><form method="post" data-vv-scope="creation" className="ajaxFormSubmit"><div className="row row5"><div className="col-md-2"><label className='font-semibold text-[14px] text-[#1e1e1e] mb-0'>From Date:</label> <div className="mx-datepicker"><div className="mx-input-wrapper"><DatePickerModal /> </div></div></div> <div className="col-md-2"><label className='mb-0 font-semibold text-[14px] text-[#1e1e1e] '>To Date:</label> <div className="mx-datepicker disabled"><div className="mx-input-wrapper"><DatePickerModal /></div></div></div> <div className="col-md-2 mt-4"><button type="submit" id="loaddata" className="btn btn-primary">
                Download CSV
            </button></div></div></form></div></div></div></div>
        </div>
    )
}

export default AssignAgent