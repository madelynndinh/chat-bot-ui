"use client";

import React from 'react'
import {Chat, Modal,Settings} from '../Components/Chat/index';


const chat = () => {
  return (
    <div>
      <Chat/>
      <Modal/>
      <script type="module" src = "script.js"></script>
    </div>
  )
}

export default chat;