import React from 'react'
import {BsFillChatFill,BsQuestionSquare,BsStar} from "react-icons/bs";
import {BiTransferAlt,BiMenu} from "react-icons/bi";
import {MdSend,MdPaid, MdSettings, MdClose} from "react-icons/md";
import {AiFillAudio, AiFillPicture} from "react-icons/ai";

const Form = ({close}) => {
  // const today = Date.now();
  // let data = new Date(today);
  // const expiredDate = data.toLocalDateString("en-US")




  return (
<form id="form_input_data" className="msger-inputarea">
<button
        className="navbar-toggler d-lg-none d-block msger-send-btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <BiMenu className="icon_size" />
        </button>
        <input type="text" name="prompt" className="msger-input" placeholder='Ask any question here...'
        rows="1"
        cols = "1"/>
        {/* <a href='' className='scan-icon'>
          <AiFillPicture className="icon_size"/>
        </a>
        <a href='' className='mic-icon'>
          <AiFillAudio className="icon_size"/>
        </a> */}
        <button 
        className="msger-send-btn"
        type="submit"
        onClick={(e) => close(e)}
        >
          <MdSend className="icon-size"/>
        </button>
</form>
  )
}

export default Form