import axios from "axios";

let access_token = localStorage.getItem("token");

const throwError = (err) => {
  console.log(err);
  if (err.response.status === 401) alert(err.response.data.error);
  if (err.response.status === 403) {
    alert(err.response.data.error);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    window.location.reload();
  }
  if (err.response.status === 400) {
    const newToken = err.response.data.error;
    localStorage.removeItem("token");
    localStorage.setItem("token", newToken);
    access_token = newToken;
    return newToken;
  }
};

const config = {
  headers: {
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
    Authorization: `Bearer ${access_token}`,
    Refresh: `${localStorage.getItem("refresh")}`,
  },
};

const _get = async (url) => {
  try {
    const result = await axios.get(url, config);
    return result.data;
  } catch (err) {
    throwError(err);
  }
};

const _post = async (url, data) => {
  try {
    const result = await axios.post(url, data, config);
    return result.data;
  } catch (err) {
    throwError(err);
  }
};

const _put = async (url, data) => {
  try {
    const result = await axios.put(url, data, config);
    return result.data;
  } catch (err) {
    throwError(err);
  }
};

const _delete = async (url) => {
  try {
    const result = await axios.delete(url, config);

    console.log(config);
    return result.data;
  } catch (err) {
    throwError(err);
  }
};

const API = {
  _get,
  _post,
  _put,
  _delete,
};

export default API;
