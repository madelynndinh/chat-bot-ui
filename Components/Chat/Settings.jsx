"use client";

import React, { useState, useEffect } from 'react';
import { MdPaid } from "react-icons/md";

//INTERNAL IMPORT

const Settings = () => {

  return (
    <div
      className='tab-pane fade'
      id="settings"
      role="tabpanel"
      aria-labelledby="settings-tab"
      tabIndex="0"
    >
      <div className='main-wrapper p-0'>
        <div className='fixed-header'>
          <div className='d-flex align-items-center gap-2'>
            <button
              className='navbar-toggle d-md-none d-block'
              type='button'
              data-bs-toggle="collapse"
              data-bs-target="#mainnavbarNav"
              aria-controls="mainnavbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className='iconsax' data-icon="text-align-justify"></i>
            </button>

            <a href="/" className='logo-icon d-flex d-md-none'>
              <img src="assets/svg/logo.svg" className='img-fluid' alt="">
              </img>
            </a>
            <h3> Settings</h3>
          </div>
        </div>
        <div className='main-section'>
          <div className='container card p-0'>
            <div className='card-header'>
              <h3 className='text-white'> My account</h3>
            </div>


            {/*//CARD MEMBERSHIP */}
            <div className='card-body px-sm-4 px-3'>
              <div className='my-account'>
                <div className='user-details'></div>
                <div className='user-main'>
                  <div className='user-profile'>
                    <img src="theblockchaincoder.jpg"
                      className='img-fluid'
                      alt="" />
                    < i className='iconsax' data-icon="camera"></i>
                  </div>
                  <div className='user-option'>
                    <h4>User's name</h4>
                    <p>User's email</p>
                  </div>
                </div>

                <form className='msger-inputarea mb-0'>
                  <div className='row'>
                    <div className='col-sm-6 col-12'>
                      <div className='mb-3'>
                        <label for="firstname" className='form-label'>
                          First Name
                        </label>
                        <input type="email" id="firstname" placeholder='Name' onChange={(e) => handleFormFieldChange("name".e)} className="msger-input" />
                      </div>
                    </div>
                    <div className='col-sm-6 col-12'>
                      <div className='mb-3'>
                        <label for="lastname" className='form-label'>
                          Last Name
                        </label>
                        <input type="email" id="lastname" placeholder='Name' onChange={(e) => handleFormFieldChange("name".e)} className="msger-input" />
                      </div>
                    </div>
                    <div className='col-sm-6 col-12'>
                      <div className='mb-3'>
                        <label for="emailid" className='form-label'>
                          Email address
                        </label>
                        <input type="email" id="emailid" placeholder='Name' onChange={(e) => handleFormFieldChange("name".e)} className="msger-input" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='card-footer'>
              <div className='setting-btn'>
                <button className="select-plan" onClick={() => updateUser()}>
                  Update
                </button>
                <button className="on-select-plan select-plan " onClick={() => updateUser()}>
                  Cancel
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Settings