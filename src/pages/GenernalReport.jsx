import React from 'react';

const GenernalReport = () => {
  return (
    <div className='w-full p-3'>
        <div data-v-61537a09="" className="listing-grid"><div className="row"><div className="col-12"><div className="page-title-box pb-0 flex items-center justify-between"><h4 className="mb-0 text-[18px]">General Report</h4> <div className="page-title-right"></div></div></div></div> <div className="row mt-3"><div className="col-12"><form method="post" data-vv-scope="toReport" className="ajaxFormSubmit"><div className="row row5"><div className="col-md-4 col-xl-2"><div className="form-group"><label>Select Type</label> <select name="type" className="form-control" aria-required="true" aria-invalid="false"><option value="general_report" selected="selected">General Report</option> <option value="credit_refrance_report">Credit Refrance Report</option></select></div></div> <div className="col-md-4 col-xl-3 mt-4"><button type="submit" id="loaddata" className="btn btn-primary">Load</button></div></div></form> <div className="table-responsive mb-0 report-table"><table role="table" aria-busy="false" aria-colcount="3" className="table b-table table-striped table-bordered" id="__BVID__473"><thead role="rowgroup" className=""><tr role="row" className=""><th role="columnheader" scope="col" aria-colindex="1" className=""><div>Sr.No</div></th><th role="columnheader" scope="col" aria-colindex="2" className=""><div>Name</div></th><th role="columnheader" scope="col" aria-colindex="3" className=""><div>Amount</div></th></tr></thead><tbody role="rowgroup"><tr role="row" className="b-table-empty-row"><td colspan="3" role="cell" className=""><div role="alert" aria-live="polite"><p className="text-center mb-0">No data available in table</p></div></td></tr></tbody></table></div></div></div></div>
    </div>
  )
}

export default GenernalReport