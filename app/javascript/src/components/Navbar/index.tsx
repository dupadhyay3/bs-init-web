import React from "react";

import { Paths } from "constants/index";

import {
  Timer,
  UsersThree,
  Buildings,
  Briefcase,
  Receipt,
  ChartLine,
  Wallet,
  Gear,
  SignOut,
  Planet,
  Swap,
  Leaf,
  Equalizer,
  UserSwitch
} from "phosphor-react";
import { NavLink } from "react-router-dom";

import "./style.scss";

const brandLogo = require("../../../../assets/images/brand/ac-logo.svg"); //eslint-disable-line
const avatar = require("../../../../assets/images/NavAvatar.svg"); //eslint-disable-line

const Navbar = ({ isAdminUser, user, permissions }) => {
  const navEmployeeOptions = [
    {
      logo: <Planet size={26} className="mr-4" />,
      label: "Spaces",
      dataCy: "spaces-tab",
      path: Paths.SPACES
    },
    {
      logo: <Swap size={26} className="mr-4" />,
      label: "TackLe",
      dataCy: "devices-tab",
      path: Paths.DEVICES
    },
    {
      logo: <Equalizer size={26} className="mr-4" />,
      label: "Engagements",
      dataCy: "engagements-tab",
      path: Paths.ENGAGEMENTS,
      permissionId: 'engagements'
    },
    {
      logo: <Leaf size={26} className="mr-4" />,
      label: "Leads",
      dataCy: "leads-tab",
      path: Paths.LEADS,
      permissionId: 'leads'
    },
    {
      logo: <Timer size={26} className="mr-4" />,
      label: "Time Tracking",
      dataCy: "time-tracking-tab",
      path: Paths.TIME_TRACKING
    },
    {
      logo: <UsersThree size={26} className="mr-4" />,
      label: "Team",
      dataCy: "team-tab",
      path: Paths.TEAM
    },
    {
      logo: <Buildings size={26} className="mr-4" />,
      label: "Clients",
      dataCy: "clients-tab",
      path: Paths.CLIENTS
    },
    {
      logo: <Briefcase size={26} className="mr-4" />,
      label: "Projects",
      dataCy: "projects-tab",
      path: Paths.PROJECTS
    }
  ];

  const navAdminOptions = [
    {
      logo: <Planet size={26} className="mr-4" />,
      label: "Spaces",
      dataCy: "spaces-tab",
      path: Paths.SPACES
    },
    {
      logo: <Swap size={26} className="mr-4" />,
      label: "TackLe",
      dataCy: "devices-tab",
      path: Paths.DEVICES
    },
    {
      logo: <Equalizer size={26} className="mr-4" />,
      label: "Engagements",
      dataCy: "engagements-tab",
      path: Paths.ENGAGEMENTS
    },
    {
      logo: <Leaf size={26} className="mr-4" />,
      label: "Leads",
      dataCy: "leads-tab",
      path: Paths.LEADS
    },
    {
      logo: <UserSwitch size={26} className="mr-4" />,
      label: "Recruitment",
      dataCy: "recruitment-tab",
      path: Paths.RECRUITMENT
    },
    {
      logo: <Timer size={26} className="mr-4" />,
      label: "Time Tracking",
      dataCy: "time-tracking-tab",
      path: Paths.TIME_TRACKING
    },
    {
      logo: <UsersThree size={26} className="mr-4" />,
      label: "Team",
      dataCy: "team-tab",
      path: Paths.TEAM
    },
    {
      logo: <Buildings size={26} className="mr-4" />,
      label: "Clients",
      dataCy: "clients-tab",
      path: Paths.CLIENTS
    },
    {
      logo: <Briefcase size={26} className="mr-4" />,
      label: "Projects",
      dataCy: "projects-tab",
      path: Paths.PROJECTS
    },
    {
      logo: <Receipt size={26} className="mr-4" />,
      label: "Invoices",
      dataCy: "invoices-tab",
      path: Paths.INVOICES
    },
    {
      logo: <ChartLine size={26} className="mr-4" />,
      label: "Reports",
      dataCy: "reports-tab",
      path: Paths.REPORTS
    },
    {
      logo: <Wallet size={26} className="mr-4" />,
      label: "Payments",
      dataCy: "payments-tab",
      path: Paths.PAYMENTS
    }
  ];

  const activeClassName =
    "flex py-3 px-4 items-center text-miru-han-purple-1000 bg-miru-gray-100 border-l-8 border-miru-han-purple-1000 font-extrabold";

  const getEmployeeOptions = () =>
    navEmployeeOptions.map((option, index) => {
      if (option.permissionId && permissions[option.permissionId] === false) return

      return (<li key={index} className="items-center hover:bg-miru-gray-100">
        <NavLink
          to={option.path}
          data-cy = {option.dataCy}
          className={({ isActive }) =>
            isActive
              ? activeClassName
              : "flex py-3 px-6 items-center hover:bg-miru-gray-100"
          }
        >
          {option.logo} {option.label}
        </NavLink>
      </li>)
    });

  const getAdminOption = () =>
    navAdminOptions.map((option, index) => (
      <li key={index} className="items-center hover:bg-miru-gray-100">
        <NavLink
          to={option.path}
          data-cy = {option.dataCy}
          className={({ isActive }) =>
            isActive
              ? activeClassName
              : "flex py-3 px-6 items-center hover:bg-miru-gray-100"
          }
        >
          {option.logo} {option.label}
        </NavLink>
      </li>
    ));

  return (
    <div className=" fixed top-0 bottom-0 left-0 shadow-2xl w-1/6 h-full flex flex-col justify-between">
      <div className=" h-20 bg-miru-gray-100 flex items-center justify-center">
        <img className="h-6" src={brandLogo} alt="ac-logo" />
      </div>
      <div className="ac-calendar-container overflow-y-auto">
        <ul className="mt-8">
          {isAdminUser ? getAdminOption() : getEmployeeOptions()}
        </ul>
      </div>
      <div>
        <ul className="mt-32">
          {/* <a>
            <li className="flex py-3 px-6 items-center hover:bg-miru-gray-100">
              <Bell size={26} className="mr-4" /> Notification
            </li>
          </a> */}
          <a href="/profile/edit">
            <li className="flex py-3 px-6 items-center hover:bg-miru-gray-100">
              <Gear size={26} className="mr-4" /> Settings
            </li>
          </a>
          {/* <a>
            <li className="flex py-3 px-6 items-center hover:bg-miru-gray-100">
              <Question size={26} className="mr-4" /> Help
            </li>
          </a> */}
          <a data-method="delete" href="/users/sign_out" rel="nofollow">
            <li className="flex py-3 px-6 items-center hover:bg-miru-gray-100">
              <SignOut size={26} className="mr-4" /> Logout
            </li>
          </a>
        </ul>
        <div className="mt-6 w-full h-16 p-4 bg-miru-gray-100 flex items-center">
          <img src={avatar} className="mr-2" alt="avatar" />
          <div className="flex flex-col overflow-x-auto">
            <span className="font-bold text-base leading-5 pt-1">{`${user.first_name} ${user.last_name}`}</span>
            <span className="font-normal text-xs leading-4">{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
