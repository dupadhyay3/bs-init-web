import React from "react";

import { Formik, Form, Field } from "formik";
import { X } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import leadTimelines from "apis/lead-timelines";
import Toastr from "common/Toastr";

const newCommentTimelineSchema = Yup.object().shape({
  comment: Yup.string().required("Comment cannot be blank")
});

const initialValues = {
  comment: "",
  kind: ""
};

const NewCommentTimeline = ({ candidateDetails, setNewCommentTimeline, timelineData, setTimelineData }) => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    leadTimelines.create(candidateDetails.id, {
      "comment": values.comment,
      "kind": 1,
      "action_subject": "added_form"
    })
      .then(res => {
        setTimelineData([{ ...res.data }, ...timelineData]);
        navigate(`/leads/${candidateDetails.id}/timelines`)
        setNewCommentTimeline(false);
        Toastr.success("Timeline added successfully");
      });
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div
        className="fixed inset-0 top-0 bottom-0 left-0 right-0 z-10 flex items-start justify-center overflow-auto"
        style={{
          backgroundColor: "rgba(29, 26, 49, 0.6)"
        }}
      >
        <div className="relative w-full h-full px-4 md:flex md:items-center md:justify-center">
          <div className="px-6 pb-6 transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:max-w-md modal-width">
            <div className="flex items-center justify-between mt-6">
              <h6 className="text-base font-extrabold">Add New Comment</h6>
              <button type="button" onClick={() => { setNewCommentTimeline(false); }}>
                <X size={16} color="#CDD6DF" weight="bold" />
              </button>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={newCommentTimelineSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="mt-4">
                    <div className="field">
                      <div className="field_with_errors">
                        <label className="form__label">Comment</label>
                        <div className="block text-xs tracking-wider text-red-600">
                          {errors.comment && touched.comment &&
                            <div>{`${errors.comment}`}</div>
                          }
                        </div>
                      </div>
                      <div className="mt-1">
                        <Field className={`w-full border border-gray-300 dark:border-gray-700 p-2 shadow-sm rounded text-sm focus:outline-none focus:border-blue-700 bg-transparent placeholder-gray-500 text-gray-600 dark:text-gray-400 ${errors.comment && touched.comment && "border-red-600 focus:ring-red-600 focus:border-red-600"}`}
                          name="comment" as="textarea" rows={8} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 actions">
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

export default NewCommentTimeline;
