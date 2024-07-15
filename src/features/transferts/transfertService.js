import axios from "axios";
import backend from "../../constants/config";

const FER_API = "http://srv-fmetier-test:8081/api/pos";
const TRANSFERT_API_URL = backend.API + "/transferts";
const CLIENT_API_URL = backend.API + "/clients";

// search customer
const searchClient = async (token, keywords) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(`${CLIENT_API_URL}/${keywords}`, config);

  return response.data;
};

const getTransferts = async (token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(`${TRANSFERT_API_URL}`, config);

  return response.data;
};

const createTransfert = async (engagementData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(TRANSFERT_API_URL, engagementData, config);

  return response.data;
};

const editTransfert = async (engagementId, engagementData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    TRANSFERT_API_URL + engagementId,
    engagementData,
    config
  );

  return response.data;
};

const deleteTransfert = async (engagementId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  await axios.delete(TRANSFERT_API_URL + engagementId, config);

  return engagementId;
};

const transfertService = {
  searchClient,
  getTransferts,
  createTransfert,
  editTransfert,
  deleteTransfert,
};

export default transfertService;
