import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthHeaders, registerIntercepts } from "apis/axios";
import leads from "apis/leads";
import { ArrowLeft, DotsThreeVertical, Receipt, CaretDown, Trash, Gear } from "phosphor-react";
import { unmapLeadList } from "../../../mapper/lead.mapper";
import DeleteLead from "../Modals/DeleteLead";
import NewLead from "../Modals/NewLead";

const Header = ({ leadDetails, setShowLeadSetting }) => {

  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [newLead, setnewLead] = useState<boolean>(false);
  const [leadToDelete, setDelete] = useState({});
  const [leadData, setLeadData] = useState<any>();

  const [isHeaderMenuVisible, setHeaderMenuVisibility] = useState<boolean>(false);
  const [isLeadOpen, toggleLeadDetails] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setShowDeleteDialog(true);
    const editSelection = leadData.find(lead => lead.id === id);
    setDelete(editSelection);
  };

  const handleLeadDetails = () => {
    toggleLeadDetails(!isLeadOpen);
  };

  const handleMenuVisibility = () => {
    setHeaderMenuVisibility(!isHeaderMenuVisible);
  };

  const handleBackButtonClick = () => {
    navigate("/leads");
  };

  useEffect(() => {
    toggleLeadDetails(!isLeadOpen);
    setAuthHeaders();
    registerIntercepts();
    leads.get("")
      .then((res) => {
        const sanitized = unmapLeadList(res);
        setLeadData(sanitized.leadList);
        // setTotalMinutes(sanitized.totalMinutes);
        // setOverDueOutstandingAmt(sanitized.overdueOutstandingAmount);
      });
  }, []);

  const menuBackground = isHeaderMenuVisible ? "bg-miru-gray-1000" : "";
  return (
    <>
      <div className="my-6">
        <div className="flex min-w-0 items-center justify-between">
          <div className="flex items-center">
            <button className="button-icon__back" onClick={handleBackButtonClick}>
              <ArrowLeft size={20} color="#5b34ea" weight="bold" />
            </button>
            <h2 className="text-3xl mr-6 font-extrabold text-gray-900 sm:text-4xl sm:truncate py-1">
              {leadDetails.name}
            </h2>
            <button onClick={handleLeadDetails}>
              <CaretDown size={20} weight="bold" />
            </button>
            <button
              onClick={() => setShowLeadSetting(true)}
              className="font-bold text-xs text-miru-han-purple-1000 tracking-widest leading-4 flex items-center ml-5"
            >
              <Gear size={15} color="#5B34EA" className="mr-2.5" />
              SETTINGS
            </button>
          </div>
          <div className="relative h-8">
            <button onClick = {handleMenuVisibility} className={`menuButton__button ${menuBackground}`}>
              <DotsThreeVertical size={20} color="#000000" />
            </button>
            { isHeaderMenuVisible && <ul className="menuButton__wrapper">
              <li>
                <button className="menuButton__list-item" onClick={() => setnewLead(true)}>
                  <Receipt size={16} color="#5B34EA" weight="bold" />
                  <span className="ml-3">Add Lead</span>
                </button>
              </li>
              <li>
                <button className="menuButton__list-item text-col-red-400" onClick={() => handleDeleteClick(leadDetails.id)}>
                  <Trash size={16} color="#E04646" weight="bold" />
                  <span className="ml-3">Delete</span>
                </button>
              </li>
            </ul> }
          </div>
        </div>
        {isLeadOpen && <div className="flex ml-12 mt-4">
          <div className="text-xs text-miru-dark-purple-400">
            <h6 className="font-semibold">Assignee</h6>
            <p>{leadDetails.assignee_name}</p>
          </div>
          <div className="ml-22 text-xs text-miru-dark-purple-400">
            <h6 className="font-semibold">Reporter</h6>
            <p>{leadDetails.reporter_name}</p>
          </div>
          <div className="ml-22 text-xs text-miru-dark-purple-400">
            <h6 className="font-semibold">Budget Amount</h6>
            <p>{leadDetails.budget_amount}</p>
          </div>
          <div className="ml-22 text-xs text-miru-dark-purple-400">
            <h6 className="font-semibold">Budget Status</h6>
            <p>{leadDetails.budget_status_code_name}</p>
          </div>
          <div className="ml-22 text-xs text-miru-dark-purple-400">
            <h6 className="font-semibold">Industry</h6>
            <p>{leadDetails.industry_code_name}</p>
          </div>
          <div className="ml-22 text-xs text-miru-dark-purple-400">
            <h6 className="font-semibold">Quality</h6>
            <p>{leadDetails.quality_code_name}</p>
          </div>
          <div className="ml-22 text-xs text-miru-dark-purple-400">
            <h6 className="font-semibold">State</h6>
            <p>{leadDetails.state_code_name}</p>
          </div>
          <div className="ml-22 text-xs text-miru-dark-purple-400">
            <h6 className="font-semibold">Status</h6>
            <p>{leadDetails.status_code_name}</p>
          </div>
        </div>
        }
      </div>
      {showDeleteDialog && (
        <DeleteLead
          setShowDeleteDialog={setShowDeleteDialog}
          lead={leadToDelete}
        />
      )}
      {newLead && (
        <NewLead
          setnewLead={setnewLead}
        />
      )}
    </>

  );
};

export default Header;
