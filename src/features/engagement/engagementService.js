import axios from "axios";
import backend from "../../constants/config";

const ENGAGEMENT_API_URL = backend.API + "/engagement";

// ENGAGEMENTS

// api call for engagement_stats
const getEngagementStats = async (token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(`${ENGAGEMENT_API_URL}/stats`, config);

  return response.data;
};

const getEngagementStatsByMission = async (token, mission) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(
    `${ENGAGEMENT_API_URL}/stats/mission/${mission}`,
    config
  );

  return response.data;
};

const getEngagements = async (token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(`${ENGAGEMENT_API_URL}/overview`, config);

  return response.data;
};

const createEngagement = async (engagementData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(
    ENGAGEMENT_API_URL + "/overview",
    engagementData,
    config
  );

  return response.data;
};

const editEngagement = async (engagementId, engagementData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    ENGAGEMENT_API_URL + "/overview/" + engagementId,
    engagementData,
    config
  );

  return response.data;
};

const deleteEngagement = async (engagementId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  await axios.delete(ENGAGEMENT_API_URL + "/overview/" + engagementId, config);

  return engagementId;
};

const getMouvements = async (token, start_date, end_date) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  let response;
  if (start_date === null || end_date === null) {
    response = await axios.get(`${ENGAGEMENT_API_URL}/mouvements`, config);
    return response.data;
  } else {
    response = await axios.get(
      `${ENGAGEMENT_API_URL}/entrees/date/${start_date}/${end_date}`,
      config
    );
  }

  // const response = await axios.get(`${ENGAGEMENT_API_URL}/mouvements`, config);

  return response.data;
};

const getMouvementsNew = async (token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(`${ENGAGEMENT_API_URL}/mouvements`, config);

  return response.data;
};

const createMouvement = async (mouvementData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(
    ENGAGEMENT_API_URL + "/mouvements",
    mouvementData,
    config
  );

  console.log("ISMO", response);

  return response.data;
};

const editMouvement = async (mouvementId, mouvementData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    ENGAGEMENT_API_URL + "/mouvement/" + mouvementId,
    mouvementData,
    config
  );

  return response.data;
};

const deleteMouvement = async (mouvementId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  await axios.delete(ENGAGEMENT_API_URL + "/mouvement/" + mouvementId, config);

  return mouvementId;
};

const getDepenses = async (token, start_date, end_date) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  let response;
  if (start_date === null || end_date === null) {
    response = await axios.get(`${ENGAGEMENT_API_URL}/depenses`, config);
    return response.data;
  } else {
    response = await axios.get(
      `${ENGAGEMENT_API_URL}/depenses/date/${start_date}/${end_date}`,
      config
    );
  }

  // const response = await axios.get(`${ENGAGEMENT_API_URL}/depenses`, config);

  return response.data;
};

const createDepense = async (depenseData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const datasToSend = new FormData();
  datasToSend.append("mission", depenseData.mission);
  datasToSend.append("date", depenseData.date);
  datasToSend.append("montant", depenseData.montant);
  datasToSend.append("libelle", depenseData.libelle);
  depenseData.facture && datasToSend.append("facture", depenseData.facture);

  const response = await axios.post(
    ENGAGEMENT_API_URL + "/depenses",
    datasToSend,
    config
  );

  console.log("ISMO", response);

  return response.data;
};

const editDepense = async (depenseId, depenseData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    ENGAGEMENT_API_URL + "/depense/" + depenseId,
    depenseData,
    config
  );

  return response.data;
};

const deleteDepense = async (depenseId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  await axios.delete(ENGAGEMENT_API_URL + "/depense/" + depenseId, config);

  return depenseId;
};

const engagementService = {
  getEngagements,
  createEngagement,
  editEngagement,
  deleteEngagement,
  getMouvements,
  getMouvementsNew,
  createMouvement,
  editMouvement,
  deleteMouvement,
  getDepenses,
  createDepense,
  editDepense,
  deleteDepense,
  getEngagementStats,
  getEngagementStatsByMission,
};

export default engagementService;
