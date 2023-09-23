import axios from "axios";
import backend from "../../constants/config";

const SETTINGS_API_URL = backend.API;

// MISSIONS
const getMissions = async (token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(`${SETTINGS_API_URL}/missions`, config);

  return response.data;
};

const createMission = async (missionData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(
    SETTINGS_API_URL + "/missions",
    missionData,
    config
  );

  return response.data;
};

const editMission = async (missionId, missionData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    SETTINGS_API_URL + "/mission/" + missionId,
    missionData,
    config
  );

  return response.data;
};

const deleteMission = async (missionId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  await axios.delete(SETTINGS_API_URL + "/mission/" + missionId, config);

  return missionId;
};

// PALIERS
const getPaliers = async (token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(`${SETTINGS_API_URL}/paliers`, config);

  return response.data;
};

const createPalier = async (palierData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(
    SETTINGS_API_URL + "/paliers",
    palierData,
    config
  );

  return response.data;
};

const editPalier = async (palierId, palierData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    SETTINGS_API_URL + "/palier/" + palierId,
    palierData,
    config
  );

  return response.data;
};

const deletePalier = async (palierId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  await axios.delete(SETTINGS_API_URL + "/palier/" + palierId, config);

  return palierId;
};

// TYPES ENTREES
const getEntrees = async (token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(`${SETTINGS_API_URL}/typeentrees`, config);

  return response.data;
};

const createEntree = async (entreeData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(
    SETTINGS_API_URL + "/typeentrees",
    entreeData,
    config
  );

  return response.data;
};

const editEntree = async (entreeId, entreeData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    SETTINGS_API_URL + "/typeentree/" + entreeId,
    entreeData,
    config
  );

  return response.data;
};

const deleteEntree = async (entreeId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  await axios.delete(SETTINGS_API_URL + "/typeentree/" + entreeId, config);

  return entreeId;
};

//  Types sortie
const getSorties = async (token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(`${SETTINGS_API_URL}/typesorties`, config);

  return response.data;
};

const createSortie = async (sortieData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(
    SETTINGS_API_URL + "/typesorties",
    sortieData,
    config
  );

  return response.data;
};

const editSortie = async (sortieId, sortieData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    SETTINGS_API_URL + "/typesortie/" + sortieId,
    sortieData,
    config
  );

  return response.data;
};

const deleteSortie = async (sortieId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  await axios.delete(SETTINGS_API_URL + "/typesortie/" + sortieId, config);

  return sortieId;
};

const settingsService = {
  getMissions,
  createMission,
  editMission,
  deleteMission,
  getPaliers,
  createPalier,
  editPalier,
  deletePalier,
  getEntrees,
  createEntree,
  editEntree,
  deleteEntree,
  getSorties,
  createSortie,
  editSortie,
  deleteSortie,
};

export default settingsService;
