"use client";

import React from 'react';
import { BsFillChatFill, BsQuestionSquare, BsStar } from 'react-icons/bs';
import { BiTransferAlt, BiMenu } from 'react-icons/bi';
import { MdPaid, MdSettings, MdClose } from 'react-icons/md';
import BottomBar from './BottomBar';

const SideBar = () => {
  
  return (
    <nav className="navbar navbar-expand-md ps-0">
      {/* Mobile toggle button */}
      <button
        className="navbar-toggle d-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainnavbarNav"
        aria-controls="mainnavbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <BiMenu className="mobil_custom_menu" />
      </button>

      <div className="collapse navbar-collapse" id="mainnavbarNav" >
        <div className="menu-panel" style={{display: 'flex', flexDirection: 'column' }}>
          {/* Close button for mobile view */}
          <button
            className="mainnav-close d-block d-md-none"
            data-bs-toggle="collapse"
            data-bs-target="#mainnavbarNav"
          >
            <MdClose className="icon-custom" />
          </button>

          {/* Logo */}
          <a href="/" className="logo-icon d-none d-md-flex">
            <img src="assets/logo.png" className="img-fluid" alt="Logo" />
          </a>

          

          {/* Navigation menu */}
          <ul className="nav nav-tabs menu-wrapper" id="myTab" role="tablist" style={{ flex: 1 }}>
            <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Chat">
              <button className="nav-link" type="button" data-bs-toggle="tab" data-bs-target="#chat" role="tab" aria-controls="chat" aria-selected="true">
                <BsFillChatFill className="icon-custom" />
                <span>Chat</span>
              </button>
            </li>

            <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="History">
              <button className="nav-link" type="button" data-bs-toggle="tab" data-bs-target="#history" role="tab" aria-controls="history" aria-selected="true">
                <BiTransferAlt className="icon-custom" />
                <span>History</span>
              </button>
            </li>

            <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Subscription">
              <button className="nav-link" type="button" data-bs-toggle="tab" data-bs-target="#subscription" role="tab" aria-controls="subscription" aria-selected="true">
                <BsStar className="icon-custom" />
                <span>Subscription</span>
              </button>
            </li>

            <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Help">
              <button className="nav-link" type="button" data-bs-toggle="tab" data-bs-target="#help" role="tab" aria-controls="help" aria-selected="true">
                <BsQuestionSquare className="icon-custom" />
                <span>Help</span>
              </button>
            </li>

            <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Upgrade">
              <button className="btn btn-primary nav-link" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <MdPaid className="icon-custom" />
                <span>Upgrade</span>
              </button>
            </li>

            <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Settings" role='presentation'>
              <button className="nav-link " id="settings-tab"  type="button" data-bs-toggle="tab" data-bs-target="#settings" role="tab" aria-controls="settings" aria-selected="true" >
                <MdSettings className="icon-custom" />
                <span>Settings</span>
              </button>
            </li>
          </ul>

          {/* Bottom Bar */}
          <div >
            <BottomBar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
