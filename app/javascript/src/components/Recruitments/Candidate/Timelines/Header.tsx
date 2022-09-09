import React, { useState } from "react";
import { CaretDown } from "phosphor-react";

const Header = ({
  setNewCommentTimeline,
  setNewAppointmentTimeline,
  setNewEmailTimeline,
  setNewPhoneCallTimeline,
  setNewSkypeDMTimeline,
  setNewLinkedinDMTimeline,
  setNewOtherDMTimeline,
  setNewTaskTimeline,
  isAdminUser
}) => {

  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const wrapperRef = React.useRef(null);

  const closeOpenToggleMenu = (e)=>{
    if (wrapperRef.current && toggleMenu && !wrapperRef.current.contains(e.target)){
      setToggleMenu(false)
    }
  };

  document.addEventListener('click',closeOpenToggleMenu)

  return (
    <div
      className={
        isAdminUser
          ? "sm:flex mt-6 mb-3 sm:items-center sm:justify-between"
          : "sm:flex mt-6 mb-3 sm:items-center"
      }>
      <h2 className="header__title"></h2>
      {isAdminUser && (
        <div className="flex flex-col">
          <button
            ref={wrapperRef}
            type="button"
            className="header__button"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <span className="ml-2 inline-block">NEW ACTION</span>
            <CaretDown weight="fill" size={16} />
          </button>
          <div className="relative">
            {toggleMenu && <div className=" ml-1 w-full absolute bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700">
              <ul className="cursor-pointer py-1 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <a onClick={() => setNewCommentTimeline(true)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Comment</a>
                </li>
                <li>
                  <a onClick={() => setNewAppointmentTimeline(true)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Appointment</a>
                </li>
                <li>
                  <a onClick={() => setNewEmailTimeline(true)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Email</a>
                </li>
                <li>
                  <a onClick={() => setNewPhoneCallTimeline(true)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Phone Call</a>
                </li>
                <li>
                  <a onClick={() => setNewSkypeDMTimeline(true)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Skype DM</a>
                </li>
                <li>
                  <a onClick={() => setNewLinkedinDMTimeline(true)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">LinkedIn DM</a>
                </li>
                <li>
                  <a onClick={() => setNewOtherDMTimeline(true)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Other DM</a>
                </li>
                <li>
                  <a onClick={() => setNewTaskTimeline(true)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Task</a>
                </li>
              </ul>
            </div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
