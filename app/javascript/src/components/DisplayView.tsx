import React, { useState } from "react";

import Main from "./Main";
import Navbar from "./Navbar";
import Header from "./Navbar/Mobile/Header";
import Navigation from "./Navbar/Mobile/Navigation";

const DisplayView = props => {
  const { isAdminUser, user, permissions } = props;
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth > 1025);
  const [selectedTab, setSelectedTab] = useState<string>("Time Tracking");

  window.addEventListener("resize", () =>
    setIsDesktop(window.innerWidth > 1025)
  );

  window.removeEventListener("resize", () =>
    setIsDesktop(window.innerWidth > 1025)
  );

  if (isDesktop) {
    return (
      <div className="absolute inset-0 flex h-full w-full">
        <Navbar isAdminUser={isAdminUser} user={user} permissions={permissions} />
        <Main {...props} isAdminUser={isAdminUser} isDesktop={isDesktop} />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <Header selectedTab={selectedTab} />
      <Main {...props} isAdminUser={isAdminUser} />
      <Navigation isAdminUser={isAdminUser} setSelectedTab={setSelectedTab} />
    </div>
  );
};

export default DisplayView;
