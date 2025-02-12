"use client";

import React from 'react';
import { VscAccount } from 'react-icons/vsc';
import { IoIosLogOut } from 'react-icons/io';
import { IoMdSunny } from 'react-icons/io';
import { IoMoonSharp } from 'react-icons/io5';
import { FaGlobe } from 'react-icons/fa';
import { useTranslation } from '../../node_modules/react-i18next';

const BottomBar = ({ toggleTheme, onOpen, changeLanguage, handleSectionSelect, colorMode }) => {

  const tooltipStyles = {
    position: 'absolute',
    bottom: '100%',
    backgroundColor: colorMode === 'light' ? '#000000cc' : '#ffffffcc',
    color: colorMode === 'light' ? '#FFFFFF' : '#000000',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    zIndex: 1,
    display: 'none',
  };

  const buttonStyles = {
    background: 'transparent',
    color: '#aaa',
    fontSize: '26px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  const containerStyles = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '12px 0',
    backgroundColor: '#FEFEFA',
    position: 'relative',
    zIndex: 1,
  };

  return (
    <div style={containerStyles}>
      {/* My Account */}
      <div style={{ position: 'relative' }}>
        <span style={{ ...tooltipStyles }}>My Account</span>
        <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Settings">
          <button className="nav-link" type="button" data-ds-toggle="tab" data-ds-target="#settings" role="tab" aria-controls="settings" aria-selected="true">
            <VscAccount className="icon-custom" />
            <span>Settings</span>
          </button>
        </li>

      </div>

      {/* Logout */}
      <div style={{ position: 'relative' }}>
        <span style={{ ...tooltipStyles }}>Logout</span>
        <button
          className="nav-link"
          type="button"
          data-ds-toggle="tab"
          data-ds-target="#Logout"
          role="tab"
          aria-selected="true"
          aria-label="Logout"
          style={buttonStyles}
          onClick={onOpen}
        >
          <IoIosLogOut />
        </button>
      </div>



    </div>
  );
};

export default BottomBar;
