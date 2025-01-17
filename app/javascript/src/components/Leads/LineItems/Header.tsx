import * as React from "react";
import { useParams } from "react-router-dom";
import leadLineItems from "apis/lead-line-items";
import { MagnifyingGlass, Plus } from "phosphor-react";
import AutoComplete from "./AutoComplete";
import { unmapLeadLineItemListForDropdown } from "../../../mapper/lead.lineItem.mapper";

const Header = ({
  setnewLead,
  isAdminUser
}) => {
  const { leadId } = useParams();

  const searchCallBack = async (searchString, setDropdownItems) => {
    await leadLineItems.index(leadId, searchString)
      .then((res) => {
        const dropdownList = unmapLeadLineItemListForDropdown(res);
        setDropdownItems(dropdownList);
      });
  };

  return (
    <div
      className={
        isAdminUser
          ? "sm:flex mt-6 mb-3 sm:items-center sm:justify-between"
          : "sm:flex mt-6 mb-3 sm:items-center"
      }>
      <h2 className="header__title"></h2>
      <div className="header__searchWrap">
        <div className="header__searchInnerWrapper">
          <AutoComplete searchCallBack={searchCallBack} />
          <button className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
            <MagnifyingGlass size={12} />
          </button>
        </div>
      </div>
      {isAdminUser && (
        <div className="flex">
          <button
            type="button"
            className="header__button"
            onClick={() => setnewLead(true)}
          >
            <Plus weight="fill" size={16} />
            <span className="ml-2 inline-block">NEW LINE ITEM</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
