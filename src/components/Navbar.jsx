import React, { useEffect, useRef, useState } from 'react';
import { Icon } from "@iconify/react";
import Sidebar from './Sidebar';
import { Link,useNavigate } from 'react-router-dom';
import { useUser } from "../components/contexts/UserContext";
import menuIcon from '@images/menu-icon.png';
import closeIcon from '@images/close-icon.png';
import booklogo from '@images/booklogo.png';
import b9 from '@images/b9.png';

const Navbar = () => {


  const { userData, verifyUser,loadingUser  } = useUser();



  const liveMarket = [
    { url: '/', name: 'Assign Agent' },
    { url: '/', name: 'Market Analysis' },
    { url: '/', name: 'Lucky 6' },
    { url: '/', name: 'Unique Teenpatti' },
    { url: '/', name: 'Roulette' },
    { url: '/', name: 'Super Over2' },
    { url: '/', name: 'Lucky15' },
    { url: '/', name: 'Goal' },
    { url: '/', name: 'Binary' },
    { url: '/', name: 'Race 20-20' },
    { url: '/', name: 'Queen' },
    { url: '/', name: 'Baccarat' },
    { url: '/', name: 'Sport Casino' },
    { url: '/', name: 'Casino War' },
    { url: '/', name: 'Worli' },
    { url: '/', name: '3 Card Judgement' },
    { url: '/', name: '32 Card Casino' },
    { url: '/', name: 'Live Teenpatti' },
    { url: '/', name: 'Teenpatti 2.0' },
    { url: '/', name: 'Live Poker' },
    { url: '/', name: 'Andar Bahar' },
    { url: '/', name: 'Lucky 7' },
    { url: '/', name: 'Dragon Tiger' },
  ];

  const liveVirtualMarket = [
    { url: '/', name: '20-20 DTL' },
    { url: '/', name: 'Amar Akbar Anthony' },
    { url: '/', name: 'Muflis Teenpatti' },
    { url: '/', name: '1 Day Teenpatti' },
    { url: '/', name: '1 Day Dragon Tiger' },
    { url: '/', name: 'Lucky 7' },
    { url: '/', name: 'Bollywood Casino' },
    { url: '/', name: '20-20 Teenpatti' },
    { url: '/', name: 'Trio' },
  ];

  const reports = [
    { url: '/account-statement', name: 'Account Statement' },
    { url: '/current-bets', name: 'Current Bets' },
    { url: '/generalreport', name: 'General Report' },
    { url: '/gamereport', name: 'Game Report' },
    { url: '/livecasinoreport', name: 'Casino Report' },
    { url: '/profitloss', name: 'Profit And Loss' },
    { url: '/casinoresult', name: 'Casino Result Report' },
    { url: '/userlock', name: 'General Lock' },
  ];

  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userItem, setUserItem] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [dropdownSticky, setDropdownSticky] = useState(false);
  const [openMenu, setOpenMenu] = useState(false)
  const dropdownRef = useRef(null);
  useEffect(() => {
    if (!userData || !userData.username) {
      verifyUser();
    }
  }, [userData, verifyUser]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserItem(false)
        setOpenDropdown(null);
        setDropdownSticky(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setDropdownSticky(false);
        setUserItem(false)
      }
    };
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    }
  }, []);


  return (
    <>
      {
        openMenu && (
          <div className='w-full flex bg-[#2e4a3b] h-dvh p-3 absolute left-0 top-0 !z-[99999]'>
            <ul className="nav !w-full align-items-center main-menu !flex !flex-col !items-center !gap-2 xl:!hidden !text-[#fff]">
              <img src={closeIcon} alt='close' className='min-w-[20px] h-[20px] cursor-pointer mb-4' onClick={() => setOpenMenu(false)} />
              <li className="nav-item"><Link  className="nav-link cursor-pointer !text-[14px]" onClick={() => { navigate('/users'); setOpenMenu(false) }}>List of
                Clients</Link ></li> <li className="nav-item"><Link to="/assign-agent" className="nav-link cursor-pointer !text-[14px] !text-[#fff]" onClick={() => { navigate('/assign-agent'); setOpenMenu(false) }}>Assign Agent</Link ></li> <li className="nav-item"><Link to="/market-analysis" aria-current="page" className="nav-link router-link-exact-active router-link-active cursor-pointer !text-[#fff] !text-[14px]" onClick={() => { navigate('/market-analysis'); setOpenMenu(false) }}>Market
                  Analysis</Link ></li>
              <li ref={dropdownRef} className={`nav-item dropdown ${openDropdown === "liveMarket" ? "show" : ""}`}
                onMouseEnter={() => { if (!dropdownSticky) setOpenDropdown("liveMarket"); }}
                onMouseLeave={() => { if (!dropdownSticky && openDropdown === "liveMarket") setOpenDropdown(null); }}
              >
                <a data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle cursor-pointer !text-[14px]"
                  onClick={(e) => {
                    e.preventDefault();
                    if (openDropdown === "liveMarket" && dropdownSticky) {
                      // clicked again -> close
                      setOpenDropdown(null);
                      setDropdownSticky(false);
                    } else {
                      // click makes it sticky-open
                      setOpenDropdown("liveMarket");
                      setDropdownSticky(true);
                    }
                  }}
                  onTouchStart={(e) => {
                    // mobile: treat touch like click
                    if (openDropdown === "liveMarket" && dropdownSticky) {
                      setOpenDropdown(null);
                      setDropdownSticky(false);
                    } else {
                      setOpenDropdown("liveMarket");
                      setDropdownSticky(true);
                    }
                  }}
                >Live
                  Market
                  <Icon icon="material-symbols:arrow-drop-down-rounded" width="24" height="24" style={{ color: '#fff', display: 'inline' }} /></a >

                <div className={`dropdown-menu ${openDropdown === "liveMarket" ? "show" : ""} max-h-[300px] overflow-auto`}>
                  {
                    liveMarket.map((item, index) => (
                      // <a key={index} href={item.url} className="dropdown-item"><span>{item.name}</span></a >
                      <Link key={index} to={item.url} className="dropdown-item" onClick={() => { setOpenDropdown(null); setDropdownSticky(false); }}>
  <span>{item.name}</span>
</Link>

                    ))
                  }

                </div>

              </li> <li ref={dropdownRef} className={`nav-item dropdown ${openDropdown === "liveVirtualMarket" ? "show" : ""}`}
                onMouseEnter={() => { if (!dropdownSticky) setOpenDropdown("liveVirtualMarket"); }}
                onMouseLeave={() => { if (!dropdownSticky && openDropdown === "liveVirtualMarket") setOpenDropdown(null); }}><a data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle cursor-pointer !text-[14px]"
                  onClick={(e) => {
                    e.preventDefault();
                    if (openDropdown === "liveVirtualMarket" && dropdownSticky) {
                      // clicked again -> close
                      setOpenDropdown(null);
                      setDropdownSticky(false);
                    } else {
                      // click makes it sticky-open
                      setOpenDropdown("liveVirtualMarket");
                      setDropdownSticky(true);
                    }
                  }}
                  onTouchStart={(e) => {
                    // mobile: treat touch like click
                    if (openDropdown === "liveVirtualMarket" && dropdownSticky) {
                      setOpenDropdown(null);
                      setDropdownSticky(false);
                    } else {
                      setOpenDropdown("liveVirtualMarket");
                      setDropdownSticky(true);
                    }
                  }}
                >Live
                  Virtual Market
                  <Icon icon="material-symbols:arrow-drop-down-rounded" width="24" height="24" style={{ color: '#fff', display: 'inline' }} /></a >
                <div className={`dropdown-menu ${openDropdown === "liveVirtualMarket" ? "show" : ""}`}>
                  {
                    liveVirtualMarket.map((item, index) => (
                      <Link key={index} to={item.url} className="dropdown-item" onClick={() => { setOpenDropdown(null); setDropdownSticky(false); }}>
  <span>{item.name}</span>
</Link>

                      // <a key={index} href={item.url} className="dropdown-item" onClick={() => navigate(item.url)}><span>{item.name}</span></a >
                    ))
                  }
                </div></li> <li ref={dropdownRef} className={`nav-item dropdown ${openDropdown === "reports" ? "show" : ""}`}
                  onMouseEnter={() => { if (!dropdownSticky) setOpenDropdown("reports"); }}
                  onMouseLeave={() => { if (!dropdownSticky && openDropdown === "reports") setOpenDropdown(null); }}><a data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle cursor-pointer !text-[14px]"

                    onClick={(e) => {
                      e.preventDefault();
                      if (openDropdown === "reports" && dropdownSticky) {
                        // clicked again -> close
                        setOpenDropdown(null);
                        setDropdownSticky(false);
                      } else {
                        // click makes it sticky-open
                        setOpenDropdown("reports");
                        setDropdownSticky(true);
                      }
                    }}
                    onTouchStart={(e) => {
                      // mobile: treat touch like click
                      if (openDropdown === "reports" && dropdownSticky) {
                        setOpenDropdown(null);
                        setDropdownSticky(false);
                      } else {
                        setOpenDropdown("reports");
                        setDropdownSticky(true);
                      }
                    }}>Reports
                  <Icon icon="material-symbols:arrow-drop-down-rounded" width="24" height="24" style={{ color: '#fff', display: 'inline' }} /></a > <div className={`dropdown-menu ${openDropdown === "reports" ? "show" : ""}`} >
                  {
                    reports.map((item, index) => (
                      <Link key={index} to={item.url} className="dropdown-item" onClick={() => { setOpenDropdown(null); setDropdownSticky(false); }}>
  <span>{item.name}</span>
</Link>

                      // <a key={index} href={item.url} className="side-nav-link-ref dropdown-item">{item.name}</a >
                    ))
                  }
                </div></li>  <li className="nav-item cursor-pointer"><a onClick={() => { navigate('/createaccount'); setOpenMenu(false) }} className="nav-link cursor-pointer !text-[14px]" >Multi
                  Login</a ></li>
              <div ref={dropdownRef} className="dropdown b-dropdown btn-group !relative sm:!hidden !block" id="__BVID__66" ><button aria-haspopup="menu" aria-expanded="false" className="btn dropdown-toggle btn-black header-item" id="__BVID__66__BV_toggle_" onClick={() => setUserItem(!userItem)}>
   {!loadingUser ? (
  <span className="ml-1">{userData?.username || "Unknown"}</span>
) : (
  <span className="ml-1">Loading...</span> // or use a spinner/skeleton
)}


                {/* <span className="ml-1">Koushalg3</span> */}
                {/* <span className="ml-1">{userData?.username || "User"}</span> */}
                <Icon icon="material-symbols:arrow-drop-down-rounded" width="24" height="24" style={{ color: '#fff', display: 'inline' }} /></button>
                {
                  userItem && (
                    <ul role="menu" tabIndex="-1" className="dropdown-menu !absolute !block !bottom-0 !left-0 !bg-[#fff] !h-full !rounded-[4px]" aria-labelledby="__BVID__66__BV_toggle_">
                      <div className="dropdown sm:hidden mx-1"><div className="bal-box"><span className="balance nowrap">Pts:
                      <span className="balance-value"><b>0</b></span> </span></div></div>  <Link to="javascript: void(0);" className="dropdown-item d-sm-none"><i className="fas fa-info-circle mr-1"></i> Rules
                      </Link > <Link to="/secureauth" onClick={() => navigate('/secureauth')} className="dropdown-item !bg-[#ffff]">
                        Secure Auth Verification
                      </Link > <Link to="/change-password" onClick={() => navigate('/secureauth')} className="dropdown-item !bg-[#fff]">
                        Change Password
                      </Link > <Link to="/sign-in" onClick={() => navigate('/sign-in')} className="dropdown-item !bg-[#fff] !rounded-b-[4px]">
                        Logout
                      </Link ></ul>
                  )
                }
              </div>
            </ul>
          </div>
        )
      }

      <header className='page-topbar relative'>
        <div className='w-full flex px-2 sm:px-3 page-topbar items-center bg-[#2e4a3b]'>
          <div className='w-full navbar-header flex justify-between items-center pr-0 gap-2'>
            <div className='flex items-center '>
              {/* {/* <div className="navbar-brand-box h-[50px] flex items-center">
                <Link to="/user2" className="logo logo-light">
                  <span className="logo-lg">
                    <img
                      src={b9}
                      alt="logo"
                      className="object-contain"
                    />
                  </span>
                </Link >
              </div> */}
                <Link to="/user2" className="logo logo-light">
                <img
                  src={b9}
                  alt="logo"
                  style={{ width: '70px', height: '100px', objectFit: 'contain' }}
                />
             
</Link >

              <button onClick={() => setShowSidebar(!showSidebar)} id='vertical-menu-btn' className='btn btn-sm px-3 font-size-16 header-item'>
                <Icon icon="dashicons:menu" width="24" height="28" style={{ color: '#fff' }} />
              </button>
              <ul className="nav align-items-center main-menu xl:!flex !hidden">
                <li className="nav-item"><a className="nav-link cursor-pointer" onClick={() => navigate('/users')}>List of
                  Clients</a ></li> <li className="nav-item"><Link to="/assign-agent" className="nav-link" onClick={() => navigate('/assign-agent')}>Assign Agent</Link ></li> <li className="nav-item"><Link to="/market-analysis" aria-current="page" className="nav-link router-link-exact-active router-link-active" onClick={() => navigate('/market-analysis')}>Market
                    Analysis</Link ></li>
                <li ref={dropdownRef} className={`nav-item dropdown ${openDropdown === "liveMarket" ? "show" : ""}`}
                  onMouseEnter={() => { if (!dropdownSticky) setOpenDropdown("liveMarket"); }}
                  onMouseLeave={() => { if (!dropdownSticky && openDropdown === "liveMarket") setOpenDropdown(null); }}
                >
                  <a data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (openDropdown === "liveMarket" && dropdownSticky) {
                        // clicked again -> close
                        setOpenDropdown(null);
                        setDropdownSticky(false);
                      } else {
                        // click makes it sticky-open
                        setOpenDropdown("liveMarket");
                        setDropdownSticky(true);
                      }
                    }}
                    onTouchStart={(e) => {
                      // mobile: treat touch like click
                      if (openDropdown === "liveMarket" && dropdownSticky) {
                        setOpenDropdown(null);
                        setDropdownSticky(false);
                      } else {
                        setOpenDropdown("liveMarket");
                        setDropdownSticky(true);
                      }
                    }}
                  >Live
                    Market
                    <Icon icon="material-symbols:arrow-drop-down-rounded" width="24" height="24" style={{ color: '#fff', display: 'inline' }} /></a >

                  <div className={`dropdown-menu ${openDropdown === "liveMarket" ? "show" : ""}`}>
                    {
                      liveMarket.map((item, index) => (
                        <Link key={index} to={item.url} className="dropdown-item" onClick={() => { setOpenDropdown(null); setDropdownSticky(false); }}>
  <span>{item.name}</span>
</Link>

                        // <a key={index} href={item.url} className="dropdown-item"><span>{item.name}</span></a >
                      ))
                    }

                  </div>

                </li> <li ref={dropdownRef} className={`nav-item dropdown ${openDropdown === "liveVirtualMarket" ? "show" : ""}`}
                  onMouseEnter={() => { if (!dropdownSticky) setOpenDropdown("liveVirtualMarket"); }}
                  onMouseLeave={() => { if (!dropdownSticky && openDropdown === "liveVirtualMarket") setOpenDropdown(null); }}><a data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (openDropdown === "liveVirtualMarket" && dropdownSticky) {
                        // clicked again -> close
                        setOpenDropdown(null);
                        setDropdownSticky(false);
                      } else {
                        // click makes it sticky-open
                        setOpenDropdown("liveVirtualMarket");
                        setDropdownSticky(true);
                      }
                    }}
                    onTouchStart={(e) => {
                      // mobile: treat touch like click
                      if (openDropdown === "liveVirtualMarket" && dropdownSticky) {
                        setOpenDropdown(null);
                        setDropdownSticky(false);
                      } else {
                        setOpenDropdown("liveVirtualMarket");
                        setDropdownSticky(true);
                      }
                    }}
                  >Live
                    Virtual Market
                    <Icon icon="material-symbols:arrow-drop-down-rounded" width="24" height="24" style={{ color: '#fff', display: 'inline' }} /></a >
                  <div className={`dropdown-menu ${openDropdown === "liveVirtualMarket" ? "show" : ""}`}>
                    {
                      liveVirtualMarket.map((item, index) => (
                        <Link key={index} to={item.url} className="dropdown-item" onClick={() => { setOpenDropdown(null); setDropdownSticky(false); }}>
  <span>{item.name}</span>
</Link>

                        // <a key={index} href={item.url} className="dropdown-item" onClick={() => navigate(item.url)}><span>{item.name}</span></a >
                      ))
                    }
                  </div></li> <li ref={dropdownRef} className={`nav-item dropdown ${openDropdown === "reports" ? "show" : ""}`}
                    onMouseEnter={() => { if (!dropdownSticky) setOpenDropdown("reports"); }}
                    onMouseLeave={() => { if (!dropdownSticky && openDropdown === "reports") setOpenDropdown(null); }}><a data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle cursor-pointer"

                      onClick={(e) => {
                        e.preventDefault();
                        if (openDropdown === "reports" && dropdownSticky) {
                          // clicked again -> close
                          setOpenDropdown(null);
                          setDropdownSticky(false);
                        } else {
                          // click makes it sticky-open
                          setOpenDropdown("reports");
                          setDropdownSticky(true);
                        }
                      }}
                      onTouchStart={(e) => {
                        // mobile: treat touch like click
                        if (openDropdown === "reports" && dropdownSticky) {
                          setOpenDropdown(null);
                          setDropdownSticky(false);
                        } else {
                          setOpenDropdown("reports");
                          setDropdownSticky(true);
                        }
                      }}>Reports
                    <Icon icon="material-symbols:arrow-drop-down-rounded" width="24" height="24" style={{ color: '#fff', display: 'inline' }} /></a > <div className={`dropdown-menu ${openDropdown === "reports" ? "show" : ""}`} >
                    {
                      reports.map((item, index) => (
                        <Link key={index} to={item.url} className="dropdown-item" onClick={() => { setOpenDropdown(null); setDropdownSticky(false); }}>
  <span>{item.name}</span>
</Link>

                        // <a key={index} href={item.url} className="side-nav-link-ref dropdown-item">{item.name}</a>
                      ))
                    }
                  </div></li>  <li className="nav-item cursor-pointer"><a onClick={() => navigate('/createaccount')} className="nav-link" >Multi
                    Login</a ></li>
                <div className="dropdown b-dropdown btn-group !relative sm:!hidden !block" id="__BVID__66" ><button aria-haspopup="menu" aria-expanded="false" className="btn dropdown-toggle btn-black header-item" id="__BVID__66__BV_toggle_" onClick={() => setUserItem(!userItem)}><span className="ml-1"> <span className="ml-1">{userData?.username || "User"}</span></span><Icon icon="material-symbols:arrow-drop-down-rounded" width="24" height="24" style={{ color: '#fff', display: 'inline' }} /></button>
                  {
                    userItem && (
                      <ul role="menu" tabIndex="-1" className="dropdown-menu !absolute !block !bottom-0 !left-0 !bg-[#2e4a3b] !h-full !rounded-[4px]" aria-labelledby="__BVID__66__BV_toggle_"><div className="dropdown sm:hidden mx-1"><div className="bal-box"><span className="balance nowrap">Pts:
                        <span className="balance-value"><b>0</b></span> </span></div></div>  <Link to="javascript: void(0);" className="dropdown-item d-sm-none"><i className="fas fa-info-circle mr-1"></i> Rules
                        </Link > <Link to="/secureauth" onClick={() => navigate('/secureauth')} className="dropdown-item !bg-[#2e4a3b]">
                          Secure Auth Verification
                        </Link > <Link to="/change-password" onClick={() => navigate('/secureauth')} className="dropdown-item !bg-[#2e4a3b]">
                          Change Password
                        </Link > <Link to="/sign-in" onClick={() => navigate('/sign-in')} className="dropdown-item !bg-[#2e4a3b] !rounded-b-[4px]">
                          Logout
                        </Link ></ul>
                    )
                  }
                </div>
              </ul>
            </div>


            {/* <img src={menuIcon} alt='menu-icon' className='min-w-[20px] h-[20px] ' onClick={() => setOpenMenu(true)} /> */}


            <div className="flex user-menu !items-center">

              <div ref={dropdownRef} className="dropdown b-dropdown btn-group !relative !hidden sm:!block" id="__BVID__66" ><button aria-haspopup="menu" aria-expanded="false" className="btn dropdown-toggle btn-black header-item" id="__BVID__66__BV_toggle_" onClick={() => setUserItem(!userItem)}><span className="ml-1"> <span className="ml-1">{userData?.username || "User"}</span></span><Icon icon="material-symbols:arrow-drop-down-rounded" width="24" height="24" style={{ color: '#fff', display: 'inline' }} /></button>
                {
                  userItem && (
                    <ul role="menu" tabIndex="-1" className="dropdown-menu !absolute !block !bottom-0 !left-0 !bg-[#2e4a3b] !h-full !rounded-[4px]" aria-labelledby="__BVID__66__BV_toggle_"><div className="dropdown sm:hidden mx-1"><div className="bal-box"><span className="balance nowrap">Pts:
                      <span className="balance-value"><b>0</b></span> </span></div></div>  <Link to="javascript: void(0);" className="dropdown-item d-sm-none"><i className="fas fa-info-circle mr-1"></i> Rules
                      </Link > <Link to="/secureauth" onClick={() => navigate('/secureauth')} className="dropdown-item !bg-[#2e4a3b]">
                        Secure Auth Verification
                      </Link > <Link to="/change-password" onClick={() => navigate('/secureauth')} className="dropdown-item !bg-[#2e4a3b]">
                        Change Password
                      </Link > <Link to="/sign-in" onClick={() => navigate('/sign-in')} className="dropdown-item !bg-[#2e4a3b] !rounded-b-[4px]">
                        Logout
                      </Link ></ul>
                  )
                }
              </div>

              <div className="site-searchbox mt-3"><div tabIndex="-1" role="combobox" aria-owns="listbox-null" className="multiselect"><div className="multiselect__select"></div>  <div className="multiselect__tags"><div className="multiselect__tags-wrap hidden" ></div>  <div className="multiselect__spinner hidden"></div> <input name="" type="text" autoComplete="off" spellCheck="false" placeholder="All Client" tabIndex="0" aria-controls="listbox-null" className="multiselect__input absolute w-0 p-0" onFocus={() => setShowMessage(true)} onBlur={() => setShowMessage(false)} />
                {/* <span className="multiselect__placeholder">
          All Client
        </span> */}
              </div>
                {
                  showMessage && (
                    <div tabIndex="-1" className="multiselect__content-wrapper hidden max-h-[300px]">
                      <ul role="listbox" id="listbox-null" className="multiselect__content block">
                        <li className='hidden' ><span className="multiselect__option"><span>No elements found</span></span></li>
                        <li><span className="multiselect__option">List is empty.</span></li>
                      </ul>
                    </div>
                  )
                }
              </div> <div className="search-icon"><Icon icon="fa-solid:search-plus" width="24" height="24" style={{ color: '#000', display: 'inline' }} /></div></div>
              <div className='xl:hidden block cursor-pointer'>
                <Icon icon="carbon:overflow-menu-vertical" width="32" height="32" style={{ color: '#fff', cursor: 'pointer' }} onClick={() => setOpenMenu(true)} />
              </div>
            </div>

          </div>
        </div>
      </header>
      {showSidebar && (<Sidebar onClose={() => setShowSidebar(false)} />)}
    </>
  )
}

export default Navbar