import React, { useEffect, useState, useRef } from "react";

import { useOutsideClick } from "helpers";
import { X, FloppyDisk, ArrowLineUpRight, PaperPlaneTilt, ThumbsUp, ThumbsDown } from "phosphor-react";
import { useNavigate, useParams } from "react-router-dom";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import leadLineItems from "apis/lead-line-items";
import leadQuotes from "apis/lead-quotes";

import HoursTotal from "./HoursTotal";
import LineItemTableHeader from "./LineItemTableHeader";
import ManualEntry from "./ManualEntry";
import NewLineItemRow from "./NewLineItemRow";
import NewLineItemTable from "./NewLineItemTable";

import { unmapLeadLineItemList } from "../../../mapper/lead.lineItem.mapper";
import { unmapLeadQuoteDetails } from "../../../mapper/lead.quote.mapper";
import { unmapQuoteLineItemList } from "../../../mapper/quote.lineItem.mapper";

const LineItemTable = () => {

  const [apiError, setApiError] = useState<string>("");

  const [lineItems, setLineItems] = useState<any>(null);
  const navigate = useNavigate();
  const { leadId } = useParams();
  const { quoteId } = useParams();
  const [selectedLineItems, setSelectedLineItems] = useState<any>([]);
  const [quoteDetails, setQuoteDetails] = useState<any>(null);

  useEffect(() => {
    setAuthHeaders();
    registerIntercepts();
    leadLineItems.index(leadId, "")
      .then((res) => {
        const sanitized = unmapLeadLineItemList(res);
        setLineItems(sanitized.itemList);
      });
    leadQuotes.edit(leadId, quoteId)
      .then((res) => {
        const sanitized = unmapQuoteLineItemList(res);
        setSelectedLineItems(sanitized.itemList);
      });
    leadQuotes.show(leadId, quoteId, "")
      .then((res) => {
        const sanitized = unmapLeadQuoteDetails(res);
        setQuoteDetails(sanitized.leadDetails);
      });
  }, [leadId]);

  const [addNew, setAddNew] = useState<boolean>(false);
  const [manualEntry, setManualEntry] = useState<boolean>(false);
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => {
    setAddNew(false);
  }, addNew);

  const getNewLineItemDropdown = () => <NewLineItemTable
    lineItems={lineItems}
    setLineItems={setLineItems}
    selectedLineItems={selectedLineItems}
    setSelectedLineItems={setSelectedLineItems}
    quoteId={quoteId}
    addNew={addNew}
    setAddNew={setAddNew}
    setManualEntry={setManualEntry}
  />;

  const getAddNewButton = () => {
    if (quoteDetails && ["accepted", "rejected", "sent"].includes(quoteDetails.status)){
      return "";
    }
    if (addNew) {
      return <div ref={wrapperRef} className="box-shadow rounded absolute m-0 font-medium text-sm text-miru-dark-purple-1000 bg-white top-0 w-full">
        {getNewLineItemDropdown()}
      </div>;
    } else {
      return <button
        className=" py-1 tracking-widest w-full bg-white font-bold text-base text-center text-miru-dark-purple-200 rounded-md border-2 border-miru-dark-purple-200 border-dashed"
        onClick={() => {
          setAddNew(!addNew);
        }}
      >
        + NEW LINE ITEM
      </button>;
    }
  };

  const handleSubmit = async (quoteStatus) => {
    await leadQuotes.update(leadId, quoteId, {
      status: quoteStatus,
      quote_line_items_attributes: selectedLineItems.map(item => ({
        id: item.id,
        name: item.name,
        comment: item.comment,
        description: item.description,
        number_of_resource: item.number_of_resource,
        resource_expertise_level: item.resource_expertise_level,
        estimated_hours: item.estimated_hours,
        lead_line_item_id: item.lead_line_item_id,
        lead_quote_id: item.lead_quote_id,
        _destroy: item._destroy
      }))
    }).then(() => {
      navigate(`/leads/${leadId}/quotes`);
    }).catch((e) => {
      setApiError(e.message);
    });
  };

  const handleCancel = () => {
    navigate(`/leads/${leadId}/quotes`)
  }

  return (
    <React.Fragment>
      <div className="bg-miru-gray-100 mt-5 mb-10 p-0 m-0 w-full">
        <div className="flex justify-between border-b-2 border-miru-gray-400 px-10 py-5 h-25">
          {quoteDetails ?
            <>
              <div className="group" ref={wrapperRef}>
                <p className="font-bold text-base text-miru-dark-purple-1000">
                  Quote
                </p>
                <div>
                  <p className="font-normal text-xs text-miru-dark-purple-1000 flex">
                    {quoteDetails.name}
                  </p>
                </div>
              </div><div className="group">
                <p className="font-bold text-base text-miru-dark-purple-1000">
                  Description
                </p>
                <div>
                  <p className="font-normal text-xs text-miru-dark-purple-1000 flex">
                    {quoteDetails.description}
                  </p>
                </div>
              </div>
            </>
            : ""}
          <div>
            <button
              type="button"
              className="header__button"
              onClick={handleCancel}
            >
              <X size={18} />
              <span className="ml-2 inline-block">CANCEL</span>
            </button>
            {quoteDetails && (!quoteDetails.status || quoteDetails.status === "draft") ?
              <button
                type="button"
                className="header__button bg-miru-han-purple-1000 text-white hover:text-white"
                onClick={() => handleSubmit('draft')}
              >
                <FloppyDisk size={18} color="white" />
                <span className="ml-2 inline-block">DRAFT</span>
              </button>
              : ""}
            {quoteDetails && quoteDetails.quote_line_items.length > 0 && quoteDetails.status === "draft" ?
              <button
                type="button"
                className="header__button bg-miru-han-purple-1000 text-white hover:text-white"
                onClick={() => handleSubmit('ready_for_approval')}
              >
                <ArrowLineUpRight size={18} color="white" />
                <span className="ml-2 inline-block">READY FOR APPROVAL</span>
              </button>
              : ""}
            {quoteDetails && quoteDetails.quote_line_items.length > 0 && quoteDetails.status === "ready_for_approval" ?
              <button
                type="button"
                className="header__button bg-miru-han-purple-1000 text-white hover:text-white"
                onClick={() => handleSubmit('sent')}
              >
                <PaperPlaneTilt size={18} color="white" />
                <span className="ml-2 inline-block">SENT</span>
              </button>
              : ""}
            {quoteDetails && quoteDetails.quote_line_items.length > 0 && quoteDetails.status === "sent" ?
              <>
                <button
                  type="button"
                  className="header__button bg-miru-han-purple-1000 text-white hover:text-white"
                  onClick={() => handleSubmit('accepted')}
                >
                  <ThumbsUp size={18} color="white" />
                  <span className="ml-2 inline-block">ACCEPT</span>
                </button>
                <button
                  type="button"
                  className="header__button bg-miru-han-purple-1000 text-white hover:text-white"
                  onClick={() => handleSubmit('rejected')}
                >
                  <ThumbsDown size={18} color="white" />
                  <span className="ml-2 inline-block">REJECT</span>
                </button>
              </>
              : ""}
          </div>
        </div>
        <div className="pl-10 py-5">
          <table className="w-full table-fixed">
            <LineItemTableHeader />
            <tbody className="w-full">
              <tr className="w-full">
                <td colSpan={6} className="py-4 relative">
                  {getAddNewButton()}
                </td>
              </tr>
              {manualEntry && !["accepted", "rejected", "sent"].includes(quoteDetails.status)
            && <ManualEntry
              setShowItemInputs={setManualEntry}
              setSelectedOption={setSelectedLineItems}
              selectedOption={selectedLineItems}
              quoteId={quoteId}
            />
              }
              {
                selectedLineItems.map((item, index) => (
                  !item._destroy && <NewLineItemRow
                    item={item}
                    selectedOption={selectedLineItems}
                    setSelectedOption={setSelectedLineItems}
                    quoteDetails={quoteDetails}
                    key={index}
                  />
                ))}
            </tbody>
          </table>
          <p className="tracking-wider mt-3 block text-xs text-red-600">{apiError}</p>
        </div>
        <HoursTotal newLineItems={selectedLineItems} />
      </div>
    </React.Fragment>
  );
};

export default LineItemTable;
