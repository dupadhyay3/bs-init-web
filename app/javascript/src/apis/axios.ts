/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { HeadersDefaults } from "axios";

import Toastr from "common/Toastr";

axios.defaults.baseURL = "/internal_api/v1";

interface CommonHeaderProperties extends HeadersDefaults {
  Accept: string;
  "Content-Type": string;
  "X-CSRF-TOKEN": string;
}

const setAuthHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  } as CommonHeaderProperties;
};

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;
    if (response?.data?.notice) {
      Toastr.success(response.data.notice);
    }
  }

  return response;
};

const handleErrorResponse = error => {
  Toastr.error(
    error.response?.data?.errors ||
      error.response?.data?.notice ||
      error.message ||
      error.notice ||
      "Something went wrong!"
  );
  if (error.response?.status === 423) {
    window.location.href = "/";
  }

  return Promise.reject(error);
};

const registerIntercepts = () => {
  const myInterceptor = axios.interceptors.response.use(handleSuccessResponse, error => {
    handleErrorResponse(error)
    return error
  });
  if ((myInterceptor - 1) >= 0) {
    axios.interceptors.response.eject(myInterceptor - 1);
  }
};

export { setAuthHeaders, registerIntercepts };
