import axios from "axios";
import backend from "../../constants/config";

const QUOTIDIEN_API_URL = backend.API + "/quotidien";
const BASE_URL = backend.API;

// SMS

const sendSms = async (datas, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(backend.API + "/sms", datas, config);

  return response.data;
};

// TIMELINE

const createTimeLine = async (timelineData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(
    backend.API + "/timelines",
    timelineData,
    config
  );

  return response.data;
};

const getTimeLine = async (token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(backend.API + "/timelines", config);

  return response.data;
};

// EVENEMENTS
const createEvenement = async (evenementData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(
    BASE_URL + "/evenements",
    evenementData,
    config
  );

  return response.data;
};

const getEvenements = async (token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(BASE_URL + "/evenements", config);

  return response.data;
};

const editEvenement = async (evenementId, evenementData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    BASE_URL + "/evenement/" + evenementId,
    evenementData,
    config
  );

  return response.data;
};

const deleteEvenement = async (evenementId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  await axios.delete(BASE_URL + "/evenement/" + evenementId, config);

  return evenementId;
};

// COMMUNICATION
const createCommunicationListe = async (listeData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(
    backend.API + "/communications",
    listeData,
    config
  );

  return response.data;
};

const getCommunicationListe = async (token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(backend.API + "/communications", config);

  return response.data;
};

const editCommunicationListe = async (listeId, listeData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    backend.API + "/communication/" + listeId,
    listeData,
    config
  );

  return response.data;
};

const deleteCommunicationListe = async (listeId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  await axios.delete(backend.API + "/communication/" + listeId, config);

  return listeId;
};

// MEMBRES
const getMembres = async (token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(`${QUOTIDIEN_API_URL}/membres`, config);

  return response.data;
};

const createMembre = async (membreData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(
    QUOTIDIEN_API_URL + "/membres",
    membreData,
    config
  );

  console.log("ISMO", response);

  return response.data;
};

const editMembre = async (membreId, membreData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    QUOTIDIEN_API_URL + "/membre/" + membreId,
    membreData,
    config
  );

  return response.data;
};

const uploadMembre = async (membreData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const datas = new FormData();
  datas.append("fichier", membreData.fichier);
  datas.append("mission", membreData.mission);
  datas.append("mode", membreData.mode);

  const response = await axios.post(
    QUOTIDIEN_API_URL + "/membre/upload",
    datas,
    config
  );

  return response.data;
};

const deleteMembre = async (membreId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  await axios.delete(QUOTIDIEN_API_URL + "/membre/" + membreId, config);

  return membreId;
};

const quotidienService = {
  getMembres,
  createMembre,
  editMembre,
  uploadMembre,
  deleteMembre,
  getCommunicationListe,
  createCommunicationListe,
  editCommunicationListe,
  deleteCommunicationListe,
  createEvenement,
  getEvenements,
  editEvenement,
  deleteEvenement,
  createTimeLine,
  getTimeLine,
  sendSms
};

export default quotidienService;
