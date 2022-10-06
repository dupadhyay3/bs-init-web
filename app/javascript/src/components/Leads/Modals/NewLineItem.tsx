import React, { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";
import { X } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import leadItemsApi from "apis/lead-items";
import leadLineItems from "apis/lead-line-items";
import Toastr from "common/Toastr";

const newLeadSchema = Yup.object().shape({
  name: Yup.string().required("Name cannot be blank"),
  price: Yup.number().typeError("Invalid Price"),
  number_of_resource: Yup.number().typeError("Invalid Number of Resource"),
  resource_expertise_level: Yup.number().typeError("Invalid Resource Expertise Level")
});

const initialValues = {
  name: "",
  description: "",
  price: 0.0,
  kind: "",
  number_of_resource: 0,
  resource_expertise_level: 0
};

const NewLineItem = ({ leadDetails, setnewLead, leadData, setLeadData }) => {
  const [kindList, setKindList] = useState<any>(null);
  const [kindVal, setKindVal] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getLeadItems = async () => {
      leadItemsApi.get()
        .then((data) => {
          setKindList(data.data.line_item_kind_names);
        }).catch(() => {
          setKindList({});
        });
    };

    getLeadItems();
  }, []);

  const handleSubmit = (values) => {
    leadLineItems.create(leadDetails.id, {
      "name": values.name,
      "description": values.description,
      "price": values.price,
      "kind": kindVal,
      "number_of_resource": values.number_of_resource,
      "resource_expertise_level": values.resource_expertise_level

    })
      .then(res => {
        setLeadData([...leadData, { ...res.data }]);
        navigate(`/leads/${leadDetails.id}/line-items`)
        setnewLead(false);
        Toastr.success("Line item added successfully");
      });
  };

  return (
    <div className="px-4 flex items-center justify-center">
      <div
        className="overflow-auto fixed top-0 left-0 right-0 bottom-0 inset-0 z-10 flex items-start justify-center"
        style={{
          backgroundColor: "rgba(29, 26, 49, 0.6)"
        }}
      >
        <div className="relative px-4 h-full w-full md:flex md:items-center md:justify-center">
          <div className="rounded-lg px-6 pb-6 bg-white shadow-xl transform transition-all sm:align-middle sm:max-w-md modal-width">
            <div className="flex justify-between items-center mt-6">
              <h6 className="text-base font-extrabold">Add New Line Item</h6>
              <button type="button" onClick={() => { setnewLead(false); }}>
                <X size={16} color="#CDD6DF" weight="bold" />
              </button>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={newLeadSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="mt-4">
                    <div className="field">
                      <div className="field_with_errors">
                        <label className="form__label">Name</label>
                        <div className="tracking-wider block text-xs text-red-600">
                          {errors.name && touched.name &&
                            <div>{`${errors.name}`}</div>
                          }
                        </div>
                      </div>
                      <div className="mt-1">
                        <Field className={`w-full border border-gray-300 dark:border-gray-700 p-1 shadow-sm rounded text-sm focus:outline-none focus:border-blue-700 bg-transparent placeholder-gray-500 text-gray-600 dark:text-gray-400 ${errors.name && touched.name && "border-red-600 focus:ring-red-600 focus:border-red-600"} `} name="name" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="field">
                      <div className="field_with_errors">
                        <label className="form__label">
                          Kind
                        </label>
                      </div>
                      <div className="mt-1">
                        <select
                          className="form__input"
                          name="kind" onChange={(e) => setKindVal(e.target.value)}>
                          <option value=''>Select Kind</option>
                          {kindList &&
                            kindList.map(e => <option value={e.id} key={e.id}>{e.name}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="field">
                      <div className="field_with_errors">
                        <label className="form__label">
                          Number of Resource
                        </label>
                        <div className="tracking-wider block text-xs text-red-600">
                          {errors.number_of_resource && touched.number_of_resource &&
                            <div>{`${errors.number_of_resource}`}</div>
                          }
                        </div>
                      </div>
                      <div className="mt-1">
                        <Field className={`form__input ${errors.number_of_resource && touched.number_of_resource && "border-red-600 focus:ring-red-600 focus:border-red-600"} `} name="number_of_resource" type="number" min="0" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="field">
                      <div className="field_with_errors">
                        <label className="form__label">
                          Resource Expertise Level
                        </label>
                        <div className="tracking-wider block text-xs text-red-600">
                          {errors.resource_expertise_level && touched.resource_expertise_level &&
                            <div>{`${errors.resource_expertise_level}`}</div>
                          }
                        </div>
                      </div>
                      <div className="mt-1">
                        <Field className={`form__input ${errors.resource_expertise_level && touched.resource_expertise_level && "border-red-600 focus:ring-red-600 focus:border-red-600"} `} name="resource_expertise_level" type="number" min="0" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="field">
                      <div className="field_with_errors">
                        <label className="form__label">Description</label>
                        <div className="tracking-wider block text-xs text-red-600">
                          {errors.description && touched.description &&
                            <div>{`${errors.description}`}</div>
                          }
                        </div>
                      </div>
                      <div className="mt-1">
                        <Field className={`form__input ${errors.description && touched.description && "border-red-600 focus:ring-red-600 focus:border-red-600"} `} name="description" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="field">
                      <div className="field_with_errors">
                        <label className="form__label">
                          Price
                        </label>
                        <div className="tracking-wider block text-xs text-red-600">
                          {errors.price && touched.price &&
                            <div>{`${errors.price}`}</div>
                          }
                        </div>
                      </div>
                      <div className="mt-1">
                        <Field className={`form__input ${errors.price && touched.price && "border-red-600 focus:ring-red-600 focus:border-red-600"} `} name="price" type="number" min="0" />
                      </div>
                    </div>
                  </div>
                  <div className="actions mt-4">
                    <input
                      type="submit"
                      name="commit"
                      value="SAVE CHANGES"
                      className="form__input_submit"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLineItem;
