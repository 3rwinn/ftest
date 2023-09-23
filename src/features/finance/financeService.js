import axios from "axios";
import backend from "../../constants/config";

const FINANCE_API_URL = backend.API + "/finance";

// FINANCE

//  api call for finance_stats
const getFinanceStats = async (token, mission, date_debut, date_fin) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(
    `${FINANCE_API_URL}/stats/mission/${mission}/debut/${date_debut}/fin/${date_fin}`,
    config
  );

  return response.data;
};

const getCaisseEntrees = async (token, start_date = null, end_date = null) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  let response;
  if (start_date === null || end_date === null) {
    response = await axios.get(`${FINANCE_API_URL}/entrees`, config);
    return response.data;
  } else {
    response = await axios.get(
      `${FINANCE_API_URL}/entrees/date/${start_date}/${end_date}`,
      config
    );
  }

  return response.data;
};

const addCaisseEntree = async (entreeData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(
    FINANCE_API_URL + "/entrees",
    entreeData,
    config
  );

  return response.data;
};

const editCaisseEntree = async (entreeId, entreeData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    FINANCE_API_URL + "/entree/" + entreeId,
    entreeData,
    config
  );

  console.log("ISMOOOOO", response.data);

  return response.data;
};

const deleteCaisseEntree = async (entreeId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.delete(
    FINANCE_API_URL + "/entree/" + entreeId,
    config
  );

  return response.data;
};

const getCaisseSorties = async (token, start_date = null, end_date = null) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  let response;
  if (start_date === null || end_date === null) {
    response = await axios.get(`${FINANCE_API_URL}/sorties`, config);
    return response.data;
  } else {
    response = await axios.get(
      `${FINANCE_API_URL}/sorties/date/${start_date}/${end_date}`,
      config
    );
  }

  return response.data;
};

const addCaisseSortie = async (sortieData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };


  const datasToSend = new FormData();
  datasToSend.append("date", sortieData.date);
  datasToSend.append("mission", sortieData.mission);
  datasToSend.append("type_sortie", sortieData.type_sortie);
  datasToSend.append("commentaire", sortieData.commentaire);
  datasToSend.append("montant", sortieData.montant);
  datasToSend.append("auteur", sortieData.auteur);
  sortieData.facture && datasToSend.append("facture", sortieData.facture)



  const response = await axios.post(
    FINANCE_API_URL + "/sorties",
    datasToSend,
    config
  );

  return response.data;
};

const deleteCaisseSortie = async (sortieId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.delete(
    FINANCE_API_URL + "/sortie/" + sortieId,
    config
  );

  return response.data;
};

const editCaisseSortie = async (sortieId, sortieData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    FINANCE_API_URL + "/sortie/" + sortieId,
    sortieData,
    config
  );

  return response.data;
};

const getSuiviBanque = async (token, start_date = null, end_date = null) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  let response;
  if (start_date === null || end_date === null) {
    response = await axios.get(`${FINANCE_API_URL}/suivis`, config);
    return response.data;
  } else {
    response = await axios.get(
      `${FINANCE_API_URL}/suivis/date/${start_date}/${end_date}`,
      config
    );
  }

  return response.data;
};

const addSuiviBanque = async (suiviData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.post(
    FINANCE_API_URL + "/suivis",
    suiviData,
    config
  );

  return response.data;
};

const deleteSuiviBanque = async (suiviId, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  await axios.delete(FINANCE_API_URL + "/suivi/" + suiviId, config);

  return suiviId;
};

const editSuiviBanque = async (suiviId, suiviData, token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.patch(
    FINANCE_API_URL + "/suivi/" + suiviId,
    suiviData,
    config
  );

  return response.data;
};

const getFicheDimanches = async (token) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const response = await axios.get(`${FINANCE_API_URL}/fiches`, config);

  return response.data;
};

// const addFicheDimanche = async (ficheData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   };

//   const datas = new FormData();
//   datas.append("fichier", ficheData.fichier);
//   datas.append("mission", ficheData.mission);
//   datas.append("mode", ficheData.mode);

//   const response = await axios.post(
//     FINANCE_API_URL + "/fiches/upload",
//     datas,
//     config
//   );

//   return response.data;
// };

const financeService = {
  getCaisseEntrees,
  addCaisseEntree,
  editCaisseEntree,
  deleteCaisseEntree,
  getCaisseSorties,
  addCaisseSortie,
  deleteCaisseSortie,
  editCaisseSortie,
  getSuiviBanque,
  addSuiviBanque,
  deleteSuiviBanque,
  editSuiviBanque,
  getFicheDimanches,
  // addFicheDimanche,
  getFinanceStats,
};

export default financeService;
