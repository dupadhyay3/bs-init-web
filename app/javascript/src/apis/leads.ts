import axios from "axios";

const path = "/leads";

const get = async (query = "") =>
  axios.get(query ? `${path}?${query}` : `${path}`);

const getActions = async (query = "") =>
  axios.get(query ? `${path}/actions?${query}` : `${path}/actions`);

const create = async (payload) => axios.post(`${path}`, payload);

const show = async (id) => axios.get(`${path}/${id}`);

const update = async (id, payload) => axios.patch(`${path}/${id}`, payload);

const destroy = async id => axios.delete(`${path}/${id}`);

const leads = { update, destroy, get, show, create, getActions };

export default leads;
