"use client";

import React, { useEffect, useState } from 'react'
import { BiMenu } from "react-icons/bi";
import { MdPaid } from 'react-icons/md';

import { Form } from './index';
//import {useStateContext} from '../../Context/index';

const Chat = () => {
  const [active, setActive] = useState("Ask anything");
  const [hide, setHide] = useState(true);
  const [proMember, setProMember] = useState({});
  const [freeTrial, setFreeTrial] = useState();


  //const [, set] = useState();

  //STATE MANAGEMENT CONTEX
  //const {Free, address} = useStateContext();
  const close = (e) => {
    e.preventDefault();
    setHide(false);
  };

  const productList = [];

  const loadData = () => {
    const UserDetail = localStorage.getItem("UserDetail");
    const member = JSON.parse(UserDetail);
    setProMember(member);

  };
  useEffect (() => {
    loadData();

  },[]);



  return (
    <div
      className='tab-pane fade show active'
      id="chat"
      role='tabpanel'
      aria-labelledby='chat'
      tabIndex="0"
    >
      <div className='main-wrapper'>
        <nav className='navbar navbar-expand-lg bg-light p-0'>

          <button
            className='navbar-toggler d-none'
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <BiMenu className="mobil_custom_menu" />
          </button>

          <div className='collapse navbar-collapse' id="navbarNav" >
            <div className='inner-menu-panel'>
              <button
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                className='inner-close d-block d-lg-name'
              >
                Back
              </button>


            </div>
          </div>
        </nav>



        {/* CHAT HEADER */}
        <div className='chat-header'>
          <div className='d-flex align-items-center gap-2'>
            <button
              className='navbar-toggle d-md-none d-block'
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainnavbarNav"
              aria-controls='mainnavbarNav'
              aria-expanded="false"
              aria-label='Toggle navigation'

            >
              <BiMenu className='mobil_custom_menu' />
            </button>
            <a href="/" className='logo-icon d-flex d-md-none'>
              <img
                src="public/assets/logo.png"
                className='img-fluid'
                alt="" />

            </a>
            <h3 id="targetDiv" >
              {active}
            </h3>


          </div>
        </div>

        <div className="main-chat">
          <div className='no-chat'>


            <div>
              
              <h3>{active == "Ask anything" ? "" : "Ask"}</h3>
            </div>


          </div>


          <div className='' id="chat_container">    
          
          </div>
          <Form close={close} />

        </div>


      </div>

    </div>
  )
}

export default Chat