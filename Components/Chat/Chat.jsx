"use client";

import React from 'react'

//INTERNAL IMPORT
import { SideBar, ChatBox, Help, History, Settings, Subscription } from "./index"

const Chat = () => {
  return (
    <section className='chatting-wrapper pt-0'>
      <SideBar />

      <div className='tab-content'>
        <ChatBox />
        <History />
        <Help />
        <Settings />
        <Subscription />


      </div>
    </section>
  )
}

export default Chat