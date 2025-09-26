import React from 'react';
import RightSideBet from '../components/RightSideBet';
import { Icon } from "@iconify/react";

const Home = () => {
  return (
    <div className='w-full main-content m-0'>
      <div className='w-full p-3'>
        <div data-v-61537a09 className='listing-grid !bg-[#f9f9f9]'>
          <div className='market-analysis'>
            <div className='row'>
              <div className='col-12'>
                <div className='page-title-box flex items-center justify-between pb-0'>
                  <h4 className='mb-0 text-[18px] !capitalize'>
            Market Analysis
            <a href="#" title='Refresh Data' className='text-dark pl-2'>
             <Icon icon="fa7-solid:sync" width="14" height="14"  style={{color: '#000'}} />
            </a>
                  </h4>
                  <div className='page-title-right'>
                    <input type="text" className='form-control' placeholder='Search Event' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home