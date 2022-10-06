import React, { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";
import { X } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import leadItemsApi from "apis/lead-items";
import leads from "apis/leads";
import Toastr from "common/Toastr";

const newLeadSchema = Yup.object().shape({
  first_name: Yup.string().required("Can't be blank"),
  last_name: Yup.string().required("Can't be blank"),
});

const initialValues = {
  first_name: "",
  last_name: "",
  quality_code: 0,
  status_code: 0
};

const NewLead = ({ setnewLead }) => {
  const [qualityCodeList, setQualityCodeList] = useState<any>(null);
  const [statusCodeList, setStatusCodeList] = useState<any>(null);

  const [qualityCode, setQualityCode] = useState<any>(null);
  const [statusCode, setStatusCode] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getLeadItems = async () => {
      leadItemsApi.get()
        .then((data) => {
          setQualityCodeList(data.data.quality_codes);
          setStatusCodeList([data.data.status_codes[0], data.data.status_codes[1]]);
        }).catch(() => {
          setQualityCodeList({});
          setStatusCodeList({});
        });
    };

    getLeadItems();
  }, []);

  const handleSubmit = (values) => {
    leads.create({
      "first_name": values.first_name,
      "last_name": values.last_name,
      "quality_code": qualityCode,
      "status_code": statusCode
    })
      .then(res => {
        navigate(`/leads/${res.data.id}`);
        setnewLead(true);
        Toastr.success("Lead added successfully");
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
              <h6 className="text-base font-extrabold">Add New Lead</h6>
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
                      </div>
                      <div className="mt-2 flex -space-x-px">
                        <div className="mr-4 w-1/2 flex-1 min-w-0">
                          <Field className={`form__input ${errors.first_name && touched.first_name && "border-red-600 focus:ring-red-600 focus:border-red-600"} `} name="first_name" placeholder="First Name" />
                          <div className="tracking-wider block text-xs text-red-600">
                            {errors.first_name && touched.first_name &&
                            <div>{`${errors.first_name}`}</div>
                            }
                          </div>
                        </div>
                        <div className="w-1/2 flex-1 min-w-0">
                          <Field className={`form__input ${errors.last_name && touched.last_name && "border-red-600 focus:ring-red-600 focus:border-red-600"} `} name="last_name" placeholder="Last Name" />
                          <div className="tracking-wider block text-xs text-red-600">
                            {errors.last_name && touched.last_name &&
                              <div>{`${errors.last_name}`}</div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="field">
                      <div className="field_with_errors">
                        <label className="form__label">
                          Quality
                        </label>
                      </div>
                      <div className="mt-1">
                        <select
                          className="form__input"
                          name="quality_code" onChange={(e) => setQualityCode(e.target.value)}>
                          <option value=''>Select Quality</option>
                          {qualityCodeList &&
                            qualityCodeList.map(e => <option value={e.id} key={e.id}>{e.name}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="field">
                      <div className="field_with_errors">
                        <label className="form__label">
                          Status
                        </label>
                      </div>
                      <div className="mt-1">
                        <select
                          className="form__input"
                          name="status_code" onChange={(e) => setStatusCode(e.target.value)}>
                          <option value=''>Select Status</option>
                          {statusCodeList &&
                            statusCodeList.map(e => <option value={e.id} key={e.id}>{e.name}</option>)}
                        </select>
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

export default NewLead;
