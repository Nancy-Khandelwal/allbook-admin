import React from 'react'

const GeneralLock = () => {
  return (
    <div className='w-full p-3'>
        <div data-v-61537a09="" className="listing-grid report-wrapper"><div className="row"><div className="col-12"><div className="page-title-box d-flex align-items-center justify-content-between"><h4 className="mb-0 font-size-18">General Lock</h4> <div className="page-title-right"></div></div></div></div> <div className="user-lock-container"><div className="m-t-20"><div><form method="post" className="ajaxFormSubmit"><div className="row row5"><div className="col-md-3"><div className="form-group user-lock-search relative"><div tabIndex="-1" role="combobox" aria-owns="listbox-null" className="multiselect multiselect--active" autoComplete="random"><div className="multiselect__select"></div>  <div className="multiselect__tags"><div className="multiselect__tags-wrap hidden"></div>  <div className="multiselect__spinner hidden"></div> <input name="" type="text" autoComplete="off" spellCheck="false" placeholder="Search By Client Name" tabIndex="0" aria-controls="listbox-null" className="multiselect__input w-full"/>  </div> <div tabIndex="-1" className="multiselect__content-wrapper max-h-[300px]"><ul role="listbox" id="listbox-null" className="multiselect__content block">   <li ><span className="multiselect__option"><span>No elements found</span></span></li> <li className='hidden'><span className="multiselect__option">List is empty.</span></li> </ul></div></div></div></div> <div className="col-md-2"><div className="form-group"><input type="password" placeholder="Transaction Code" className="form-control d-inline-block inline-block" /></div></div> <div className="col-md-2"><button type="submit" id="loaddata" className="btn btn-primary">
                Load
              </button> <button type="button" id="reset" className="btn btn-light">
                Reset
              </button></div></div></form></div></div> </div></div>
    </div>
  )
}

export default GeneralLock