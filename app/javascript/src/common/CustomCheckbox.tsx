import React from "react";

import classnames from "classnames";

type CustomCheckboxProps = {
  text?: React.ReactNode | string;
  isChecked: boolean;
  checkboxValue: string | number;
  id: string;
  handleCheck;
  name?: string;
  wrapperClassName?: string;
  labelClassName?: string;
};
const CustomCheckbox = ({
  text,
  isChecked = false,
  checkboxValue,
  id,
  handleCheck,
  name="",
  wrapperClassName="",
  labelClassName=""
}: CustomCheckboxProps) => (
  <div className={classnames("flex items-center", wrapperClassName)}>
    <div className={classnames("grid grid-cols-1 grid-rows-1 justify-items-center content-center")}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={isChecked}
        onChange={handleCheck}
        value={checkboxValue}
        data-cy= 'select-all-checkbox'
        className="grid col-start-1 row-start-1 w-5 h-5 opacity-0 cursor-pointer custom__checkbox"
      />
      <div className="grid col-start-1 row-start-1 justify-items-center content-center flex-shrink-0 w-5 h-5 mr-2 bg-white border-2 border-miru-han-purple-1000 focus-within:border-blue-500">
        <svg
          className={classnames(
            "w-2 h-2 pointer-events-none fill-current text-miru-han-purple-1000",
            { hidden: !isChecked }
          )}
          version="1.1"
          viewBox="0 0 17 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(-9 -11)" fill="#0033CC" fillRule="nonzero">
              <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
            </g>
          </g>
        </svg>
      </div>
    </div>

    {text !== "" && (
      <label htmlFor={name} className={classnames("select-none",labelClassName)}>
        {text}
      </label>
    )}
  </div>
);

export default CustomCheckbox;
