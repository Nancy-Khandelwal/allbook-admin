import React from 'react';
import DatePickerModal from '../components/DatePickerModal';

const GameReport = () => {
  return (
    <div className='w-full p-3'>
    <div className="listing-grid report-wrapper">
           <div className="row"><div className="col-12"><div className="page-title-box flex items-center justify-between pb-0"><h4 className="mb-0 text-[18px]">Game Report</h4> <div className="page-title-right"></div></div></div></div>

           <div className="row mt-3"><div className="col-12"><form method="post" data-vv-scope="toReport" className="ajaxFormSubmit"><div className="row"><div className="col-md-2"><label className='font-semibold text-[14px] text-[#1e1e1e]'>From</label> <div className="mx-datepicker"><div  className="mx-input-wrapper"><DatePickerModal /></div></div></div> <div className="col-md-2"><label className='font-semibold text-[14px] text-[#1e1e1e]'>To</label> <div className="mx-datepicker"><div className="mx-input-wrapper"><DatePickerModal /></div></div></div> <div className="col-md-4 col-xl-2"><div className="form-group"><label className='font-semibold text-[14px] text-[#1e1e1e]'>Type</label> <select name="type" className="form-control" aria-required="true" aria-invalid="false"><option value="all">All</option> <option value="match">Match</option> <option value="fancy">Fancy</option></select></div></div> <div className="col-md-4 col-xl-3 mt-4"><button type="submit" id="loaddata" className="btn btn-primary">
              Game List
            </button></div></div></form></div></div>

            <div className="row"><div className="col-12"><form method="post" data-vv-scope="gamereport" className="ajaxFormSubmit"><div className="row"><div className="col-md-8 col-xl-6"><div className="form-group"><select name="type" className="form-control" aria-required="true" aria-invalid="false"><option value="all">All</option></select></div></div> <div className="col-md-4 col-xl-3"><button type="submit" id="loaddata" className="btn btn-primary">
              Show Game Report
            </button> <button type="submit" id="loaddata" className="btn btn-primary">
              Master Game Report
            </button></div></div></form></div></div>

            <div className="table-responsive mb-0 report-table"><table role="table" aria-busy="false" aria-colcount="3" className="table b-table table-striped table-bordered" id="__BVID__545"><thead role="rowgroup" className=""><tr role="row" className=""><th role="columnheader" scope="col" aria-colindex="1" className=""><div>Sr.No</div></th><th role="columnheader" scope="col" aria-colindex="2" className=""><div>Name</div></th><th role="columnheader" scope="col" aria-colindex="3" className=""><div>Amount</div></th></tr></thead><tbody role="rowgroup"><tr role="row" className="b-table-empty-row"><td colspan="3" role="cell" className=""><div role="alert" aria-live="polite"><p className="text-center mb-0">No data available in table</p></div></td></tr></tbody></table></div>
    </div>
    </div>
  )
}

export default GameReport