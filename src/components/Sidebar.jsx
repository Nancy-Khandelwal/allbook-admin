import React, { useEffect, useRef, useState } from 'react';
import {gameNames,specialGames} from "./constant/accountRoles";
import useApi from '../components/hooks/useApi';
import Cookies from "universal-cookie";
import useToast from './hooks/useToast';
import GameDetails from '../pages/GameDetails';
import { Link } from "react-router-dom";
// const Sidebar = ({onClose}) => {

//     const allSportsData = [
//   {
//     name: "Politics",
//     children: [
//       {
//         name: "Assembly Election 2025",
//         children: [
//           {
//             name: "Round 1",
//             children: [
//               { name: "Phase A", children: [{ name: "Phase (i)", link: "/phase-(i)" },] },
//               { name: "Phase B", children: [{ name: "Phase (ii)", link: "/phase-(ii)" },]},
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Politics",
//     children: [
//       {
//         name: "Assembly Election 2025",
//         children: [
//           {
//             name: "Round 1",
//             children: [
//               { name: "Phase A", children: [{ name: "Phase (i)", link: "/phase-(i)" },] },
//               { name: "Phase B", children: [{ name: "Phase (ii)", link: "/phase-(ii)" },]},
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];


//   const [openMenus, setOpenMenus] = useState({});

//   const toggleMenu = (path) => {
//     setOpenMenus((prev) => ({
//       ...prev,
//       [path]: !prev[path],
//     }));
//   };
    

//     const renderMenu = (items, parentPath = "") => {
//         const depth = parentPath.split("-").length - 1;
//     return (
//       <ul className="list-unstyled ml-3 bg-[#F9F9F9]">
//         {items.map((item, idx) => {
//           const path = `${parentPath}-${idx}`;
//           const hasChildren = item.children && item.children.length > 0;
//           const isOpen = openMenus[path];
//           return (
//             <li key={path} className={`py-1 menu-box ${
//               depth > 0 ? "border-l border-[#000]" : ""
//             } relative`}>
//                 {depth > 0 && (
//               <div className="w-2 h-2 bg-[#AE4600] absolute -left-1 rounded-full top-3"></div>
//             )}
//               <div
//                 className={`flex justify-start items-center gap-2 cursor-pointer px-2 py-1`}
//                 onClick={() => hasChildren && toggleMenu(path)}
//               >
//                 {/* if item has link, make it clickable */}
//                 {item.link ? (
//                   <a href={item.link} className="!text-[#1e1e1e] font-medium text-[12px] hover:underline p-0">
//                     {item.name}
//                   </a>
//                 ) : (
//                   <span className='text-[#1e1e1e] font-medium text-[12px]'>{item.name}</span>
//                 )}
//                 {hasChildren && (
//                   <b className="ml-[2px] font-bold text-[12px] text-[#1e1e1e]">{isOpen ? "−" : "+"}</b>
//                 )}
//               </div>
//               {/* Nested children */}
//               {hasChildren && isOpen && renderMenu(item.children, path)}
//             </li>
//           );
//         })}
//       </ul>
//     )};

//   return (
//     <div className="vertical-menu z-50 bg-[#f9f9f9] shadow-md w-64">
//       <div className="h-[calc(100dvh-52px)] overflow-y-auto">
//         <div id="sidebar-menu">
//           <ul id="side-menu" className="list-unstyled">
//             <li id="event-tree" className="">
//               <div className="menu-box w-full flex justify-between items-center p-2 font-bold">
//               <a className='w-full !flex !justify-between items-center' href="javascript: void(0);"><span className=''>Sports</span> <i className="fa fa-times float-right" onClick={onClose}></i></a>
//               </div>
//               {/* Dynamic multi-level dropdown */}
//               {renderMenu(allSportsData)}
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

const Sidebar = ({ onClose }) => {
  const [openMenus, setOpenMenus] = useState({});
  const { apiCall } = useApi();
  const { toastError } = useToast();
  const [sportsData, setSportsData] = useState([]);

  // const toggleMenu = (path) => {
  //   setOpenMenus((prev) => ({
  //     ...prev,
  //     [path]: !prev[path],
      
  //   }));
  // };
  const toggleMenu = (path) => {
    setOpenMenus((prev) => {
      const newState = {
        ...prev,
        [path]: !prev[path],
      };
      // ✅ Save in localStorage
      localStorage.setItem("sidebarOpenMenus", JSON.stringify(newState));
      return newState;
    });
  };

   useEffect(() => {
    const savedMenus = localStorage.getItem("sidebarOpenMenus");
    if (savedMenus) {
      setOpenMenus(JSON.parse(savedMenus));
    }
  }, []);
 
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await apiCall("GET", "sports/sidenav-data");
        if (res?.data) {
          setSportsData(res.data);
        } else {
          toastError("Failed to load sports data");
        }
      } catch (error) {
        toastError(error.message || "API Error");
      }
    };
    fetchSports();
  }, []);

  
  const renderMenu = (items, parentPath = "") => {
    const depth = parentPath.split("-").length - 1;

    return (
      <ul className="list-unstyled ml-3 bg-[#F9F9F9]">
        {items.map((item, idx) => {
          const path = `${parentPath}-${idx}`;
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openMenus[path];

          return (
            <li
              key={path}
              className={`py-1 menu-box ${
                depth > 0 ? "border-l border-[#000]" : ""
              } relative`}
            >
              {depth > 0 && (
                <div className="w-2 h-2 bg-[#2e4a3b] absolute -left-1 rounded-full top-3"></div>
              )}

              {/* Row */}
              <div
                className="flex items-center gap-2 items-center cursor-pointer px-2 py-1"
                onClick={() => hasChildren && toggleMenu(path)}
              >
                {/* <span className="text-[#1e1e1e] font-medium text-[12px]">
                  {item.name}
                </span> */}
{item.link ? (
                // Use Link for clickable items
                <Link
                  to={item.link}
                  className="text-[#1e1e1e] font-medium text-[12px]"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-[#1e1e1e] font-medium text-[12px]">
                  {item.name}
                </span>
              )}
                {hasChildren && (  
            
                  <b className="text-[12px] font-bold text-[#1e1e1e]"  >
                 
                 
                    {isOpen ? "−" : "+"}
                  </b>
              )} 
              </div>

              {/* Children */}
              {hasChildren && isOpen && renderMenu(item.children, path)}
            </li>
          );
        })}
      </ul>
    );
  };

  
  
 const transformData = (gameNames, apiData, specialGames = ["7", "4339"]) => {
  return (gameNames || []).map((game) => {
    
    const sportFromApi = apiData.find((s) => String(s.id) === String(game.id));

    if (!sportFromApi) {
      return { name: game.title, children: [] };
    }

    const isSpecial = specialGames.includes(String(game.id));

    return {
      name: game.title,
      children: (sportFromApi.leagues || []).map((league) => ({
        name: league.title,
        children: Object.entries(league.matchesByDate || {}).map(
          ([date, matches]) => ({
            name: date,
            children: (matches || []).map((match) => ({
              name: match.name,
              link: `/game-details/${game.id}/${match.matchId}`,
              children: (match.markets || []).map((market) => ({
                name: market.name,
                link: isSpecial
                  ? `/game-details/${game.id}/${match.matchId}/${market.marketTypeId}`
                  : `/game-details/${game.id}/${match.matchId}`, 
              })),
            })),
          })
        ),
      })),
    };
  });
};


  const menuData = transformData(gameNames,sportsData);
 
  return (
    <div className="vertical-menu z-50 bg-[#f9f9f9] shadow-md w-64">
      <div className="h-[calc(100dvh-52px)] overflow-y-auto">
        <div id="sidebar-menu">
          <ul id="side-menu" className="list-unstyled">
            <li id="event-tree">
              <div className="menu-box w-full flex justify-between items-center p-2 font-bold">
                <a
                  className="w-full !flex !justify-between items-center"
                  href="javascript:void(0);"
                >
                  <span>Sports</span>
                <i className="fa-solid fa-xmark cursor-pointer" onClick={onClose}></i>


                </a>
              </div>

              {/* Dynamic nested menu */}
              {renderMenu(menuData)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;