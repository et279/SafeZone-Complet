import './Header.css';
import React from 'react';
import { LuArrowLeftFromLine, LuArrowRightToLine, LuBell, LuMoon, LuSun, LuUser } from "react-icons/lu";
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps{
  openMenu: () => void;
  isOpenMenu: boolean;
}
const Header: React.FC<HeaderProps> = ({openMenu, isOpenMenu}) => {
  
  const { theme, toggleTheme } = useTheme();  
  return (
    <div className="headerr header-Sticky">
        <div className="container-fluidd">
          <button type="button" onClick={openMenu} className='btn-nav-icon'>
            <div className='nav-linkk btn-nav-icon'>
              {!isOpenMenu ? <LuArrowLeftFromLine /> : <LuArrowRightToLine />}
            </div>
          </button>
          {/* LINKS HEADER IZQUIERDO
          <ul className='header-links'>
            <li className="nav-item">
              <a className="nav-linkk" href="#/dashboard">Dashboard</a>
            </li>
          </ul>*/
          }
          {/* LINKS HEADER IZQUIERDO*/}
          <ul className='header-links left'>
          {  <li className="nav-item">
              <a className="nav-linkk btn-nav-icon" href="#/dashboard"><LuBell/></a>
            </li>
          }
            <li className="nav-item ">
              <div className="seprt">
              </div>
            </li>
            <li className="nav-item " onClick={toggleTheme}>
              <div className='nav-linkk btn-nav-icon'>
                {theme === 'light' ?<LuSun/>: <LuMoon/>}
              </div>
            </li>
            <li className="nav-item ">
              <div className="seprt">
              </div>
            </li>
            <li className="nav-item item-user">
              <div className='nav-linkk btn-nav-icon'>
                <LuUser/>
              </div>
            </li>
          </ul>
        </div>
    </div>
  );
};

export default Header;
