import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewProfileLayer = () => {
  const { user } = useSelector((state)=>state.user)

  return (
    <div className='row gy-4'>
      <div className='col-lg-6 mx-auto'>
        <div className='user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100'>
          <img
            src='assets/images/background.png'
            alt='WowDash React Vite'
            className='w-100 object-fit-cover'
          />
          <div className='pb-24 ms-16 mb-24 me-16  mt--100'>
            <div className='text-center border border-top-0 border-start-0 border-end-0'>
              <img
                src={user?.profile}
                alt='WowDash React Vite'
                className='border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover'
              />
              <h6 className='mb-0 mt-16'>{user?.name}</h6>
              <span className='text-secondary-light mb-16'>
                {user?.email}
              </span>
            </div>
            <div className='mt-24'>
              <h6 className='text-xl mb-16'>Personal Info</h6>
              <ul>
                <li className='d-flex align-items-center gap-1 mb-12'>
                  <span className='w-30 text-md fw-semibold text-primary-light'>
                    Full Name
                  </span>
                  <span className='w-70 text-secondary-light fw-medium'>
                    : {user?.name}
                  </span>
                </li>
                <li className='d-flex align-items-center gap-1 mb-12'>
                  <span className='w-30 text-md fw-semibold text-primary-light'>
                    {" "}
                    Email
                  </span>
                  <span className='w-70 text-secondary-light fw-medium'>
                    : {user?.email}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ViewProfileLayer;
