import React, { useState } from "react";

import { Formik, Form, Field } from "formik";
import { X } from "phosphor-react";
import * as Yup from "yup";

import candidates from "apis/candidates";

const newCandidateSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name cannot be blank")
});

const getInitialvalues = (candidate) => ({
  first_name: candidate.first_name,
  email: candidate.email,
  last_name: candidate.last_name,
  consultancy_id: candidate.consultancy_id
});

export interface IEditCandidate {
  setShowEditDialog: any;
  candidate: any;
}

const EditCandidate = ({ setShowEditDialog, candidate }: IEditCandidate) => {

  const [apiError, setApiError] = useState<string>("");

  const handleSubmit = async values => {
    await candidates.update(candidate.id, {
      candidate: {
        "first_name": values.first_name,
        "last_name": values.last_name,
        "email": values.email
      }
    }).then(() => {
      setShowEditDialog(false);
      document.location.reload();
    }).catch((e) => {
      setApiError(e.message);
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
              <h6 className="text-base font-extrabold">Edit Candidate</h6>
              <button type="button" onClick={() => { setShowEditDialog(false); }}>
                <X size={16} color="#CDD6DF" weight="bold" />
              </button>
            </div>
            <Formik
              initialValues={getInitialvalues(candidate)}
              validationSchema={newCandidateSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="mt-4">
                    <div className="field">
                      <div className="field_with_errors">
                        <label className="form__label">First Name</label>
                        <div className="tracking-wider block text-xs text-red-600">
                          {errors.first_name && touched.first_name &&
                          <div>{`${errors.first_name}`}</div>
                          }
                        </div>
                      </div>
                      <div className="mt-1">
                        <Field className={`form__input ${errors.first_name && touched.first_name && "border-red-600 focus:ring-red-600 focus:border-red-600"} `} name="first_name" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="field">
                      <div className="field_with_errors">
                        <label className="form__label">Last Name</label>
                        <div className="tracking-wider block text-xs text-red-600">
                          {errors.last_name && touched.last_name &&
                          <div>{`${errors.last_name}`}</div>
                          }
                        </div>
                      </div>
                      <div className="mt-1">
                        <Field className={`form__input ${errors.last_name && touched.last_name && "border-red-600 focus:ring-red-600 focus:border-red-600"} `} name="last_name" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="field">
                      <div className="field_with_errors">
                        <label className="form__label">Email</label>
                        <div className="tracking-wider block text-xs text-red-600">
                          {errors.email && touched.email &&
                          <div>{`${errors.email}`}</div>
                          }
                        </div>
                      </div>
                      <div className="mt-1">
                        <Field className={`form__input ${errors.email && touched.email && "border-red-600 focus:ring-red-600 focus:border-red-600"} `} name="email" />
                      </div>
                    </div>
                  </div>
                  <p className="tracking-wider mt-3 block text-xs text-red-600">{apiError}</p>
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

export default EditCandidate;
