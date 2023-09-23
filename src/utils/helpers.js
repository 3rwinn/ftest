import dayjs from "dayjs";
// var customParseFormat = require("dayjs/plugin/customParseFormat");
// dayjs.extend(customParseFormat);
import 'dayjs/locale/fr' // load on demand
dayjs.locale('fr') 

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getMonthNameV0 = (date1, date2, monthNumber) => {
  const monthName = dayjs(date1).month(monthNumber).format("MMMM YYYY");
  const monthName2 = dayjs(date2).month(monthNumber).format("MMMM YYYY");
  if (dayjs(date1).isBefore(date2)) {
    return monthName;
  } else {
    return monthName2;
  }
};

export const getMonthName = (dateDebut, dateFin, monthCode) => {
  const dateDebutMonth = dayjs(dateDebut).month();
  const dateFinMonth = dayjs(dateFin).month();
  const dateDebutYear = dayjs(dateDebut).year();
  const dateFinYear = dayjs(dateFin).year();

  if (
    dateDebutMonth <= monthCode &&
    monthCode <= dateFinMonth &&
    dateDebutYear === dateFinYear
  ) {
    return dayjs().month(monthCode).format("MMMM YYYY");
  } else if (
    dateDebutMonth <= monthCode &&
    monthCode <= dateFinMonth &&
    dateDebutYear !== dateFinYear
  ) {
    return dayjs().month(monthCode).format("MMMM YYYY");
  } else {
    return null;
  }
};

export function sortCasByText(arr, ascending = true) {
  const sortedArray = arr.slice(); // Create a shallow copy of the original array

  sortedArray.sort((a, b) => {
    const textA = a.name.toLowerCase();
    const textB = b.name.toLowerCase();

    if (textA < textB) {
      return ascending ? -1 : 1;
    }
    if (textA > textB) {
      return ascending ? 1 : -1;
    }
    return 0;
  });

  return sortedArray;
}

export function sortArrayByText(arr, ascending = true) {
  const sortedArray = arr.slice(); // Create a shallow copy of the original array

  sortedArray.sort((a, b) => {
    const textA = a.text.toLowerCase();
    const textB = b.text.toLowerCase();

    if (textA < textB) {
      return ascending ? -1 : 1;
    }
    if (textA > textB) {
      return ascending ? 1 : -1;
    }
    return 0;
  });

  return sortedArray;
}

export function getAllText(data) {
  let text = "";

  if (typeof data === "string") {
    text = data;
  } else if (Array.isArray(data)) {
    data.forEach((item) => {
      if (typeof item === "string") {
        text += item;
      } else if (typeof item === "object") {
        text += getAllText(item);
      }
    });
  } else if (typeof data === "object") {
    Object.values(data).forEach((value) => {
      if (typeof value === "string") {
        text += value;
      } else if (typeof value === "object") {
        text += getAllText(value);
      }
    });
  }

  return text;
}

export function formatLocaleEn(date) {
  return dayjs(date).format("YYYY-MM-DD");
}

export function formatLocaleFr(date) {
  return dayjs(date).format("DD-MM-YYYY");
}

export const formatDataToSelect = (datas) => {
  let dataSelect = [];

  datas?.map((data) =>
    dataSelect.push({
      id: data.id,
      name: data.libelle
        ? data.libelle
        : data.montant
        ? data.montant
        : data.text,
      value: data.id,
    })
  );

  return dataSelect;
};

export const formatMembreToSelect = (datas) => {
  let dataSelect = [];

  datas?.map((data) =>
    dataSelect.push({
      id: data.id,
      name: data.nom + " " + data.prenom,
      value: data.id,
    })
  );

  return dataSelect;
};

export const cleanQuestionDatas = (datas) => {
  let datasCleaned = [];

  datas?.map((data) => {
    datasCleaned.push({
      id: data.iname,
      libelle: data.value,
      reponses: formatAnswers(data.reponses),
      brut_datas: JSON.stringify(data),
    });
  });

  return datasCleaned;
};

export function formatAnswers(datas) {
  let newData = [];

  datas?.map((data) =>
    newData.push({
      id: data.rep_iname,
      value: data.rep_value,
      veracite: data.rep_veracite,
    })
  );

  return newData;
}

export const loadQuestionsBrutDatas = (questions) => {
  let realDatas = [];

  questions?.map((question) => {
    let d = JSON.parse(question.brut_datas);
    realDatas.push({ ...d });
  });

  return realDatas;
};

export function replaceInArray(array, object) {
  const index = array.findIndex((item) => item.id === object.id);
  if (index === -1) {
    // No item in the array has the same id as the given object
    return array;
  } else {
    // Replace the item in the array with the given object
    return [...array.slice(0, index), object, ...array.slice(index + 1)];
  }
}

export function replaceInArrayWithIname(array, object) {
  const index = array.findIndex((item) => item.iname === object.iname);
  if (index === -1) {
    // No item in the array has the same id as the given object
    return array;
  } else {
    // Replace the item in the array with the given object
    return [...array.slice(0, index), object, ...array.slice(index + 1)];
  }
}

export function SpecialReplaceInArray(array, object) {
  const index = array.findIndex((item) => item.libelle === object.libelle);
  if (index === -1) {
    // No item in the array has the same id as the given object
    return array;
  } else {
    // Replace the item in the array with the given object
    return [...array.slice(0, index), object, ...array.slice(index + 1)];
  }
}

export function replaceObjectInArray(arr, targetObj, replacementObj) {
  const index = arr.findIndex((obj) => obj === targetObj);
  if (index !== -1) {
    arr[index] = replacementObj;
  }

  return arr;
}

export function replaceInArrayWithID(array, object) {
  // const index = array.findIndex((item) => item.email === object.email);
  const index = array.findIndex((item) => item.id === object.id);
  if (index === -1) {
    // No item in the array has the same id as the given object
    return array;
  } else {
    // Replace the item in the array with the given object
    return [...array.slice(0, index), object, ...array.slice(index + 1)];
  }
}

export function deepReplaceObjectInArray(
  arr,
  propName,
  propValue,
  replacementObj
) {
  const index = arr.findIndex((obj) => obj[propName] === propValue);
  if (index !== -1) {
    arr[index] = replacementObj;
  }

  return arr;
}

export function findOneElementInArray(array, elementId) {
  let elementFound = array?.find((item) => item.id === elementId);
  return elementFound === undefined ? "" : elementFound;
}
export function findOneElementInArrayBySlug(array, elementId) {
  let elementFound = array?.find((item) => item.slug === elementId);
  return elementFound === undefined ? "" : elementFound;
}

export function findProfileInArray(array, userId) {
  let elementFound = array?.find((item) => item.user === userId);
  return elementFound === undefined
    ? { user: userId, profile: null }
    : { user: userId, profile: elementFound };
}

export function findProfProfileInArray(array, userId) {
  let elementFound = array?.find((item) => item.id === userId);
  return elementFound === undefined
    ? { user: userId, profile: null }
    : { user: userId, profile: elementFound };
}

export function calculateSuccessPercentage(answers) {
  const trueAnswersCount = answers?.filter(
    (answer) => answer.value === true
  ).length;
  const totalAnswersCount = answers.length;

  return (trueAnswersCount / totalAnswersCount) * 100;
}

export function isBeforeCurrentDate(date) {
  let dateConverted = dayjs(date).toDate();
  const currentDate = new Date();
  return dateConverted.getTime() < currentDate.getTime();
}

export function sumModuleLengths(arr) {
  let sum = 0;
  arr?.forEach((obj) => {
    obj?.modules.forEach((subObj) => {
      sum += subObj?.subModules?.length;
    });
  });
  return sum;
}

export function roundNumber(num, decimalPlaces) {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(num * multiplier) / multiplier;
}

export function getEquipeForParticipant(participantId, groups) {
  let participantEquipe = "Non trouvé";

  groups?.forEach((group) => {
    const currentParticipant = group.participants.find(
      (p) => p.id === participantId
    );
    if (currentParticipant) {
      const equipe = group.sous_equipes.find(
        (e) => e.slug === currentParticipant.equipe
      );

      if (equipe) {
        participantEquipe = equipe.libelle;
      }
    }
  });

  return participantEquipe;
}

export function addParticipantInfo(groups, profiles) {
  let participants = [];

  groups?.forEach((group) => {
    group?.participants?.forEach((participant) => {
      // find the corresponding equipe object for this participant
      let newParticipant = { ...participant };
      const equipe = group.sous_equipes.find(
        (e) => e.slug === participant.equipe
      );
      if (equipe) {
        newParticipant.equipe_libelle = equipe.libelle;
      }
      // add the groupe libelle to the participant
      const lastName = findProfileInArray(profiles, participant.id)?.profile
        ?.nom;
      const firstName = findProfileInArray(profiles, participant.id)?.profile
        ?.prenom;
      const email_pro = findProfileInArray(profiles, participant.id)?.profile
        ?.email_pro;
      const photo = findProfileInArray(profiles, participant.id)?.profile
        ?.photo;

      newParticipant.groupe_libelle = group.libelle;
      newParticipant.full_name = lastName + " " + firstName;
      newParticipant.imgUrl = photo;
      newParticipant.email_pro = email_pro;
      newParticipant.groupeDatas = { ...group };

      participants.push(newParticipant);
    });
  });
  return participants;
}

// function to format number to money
export function formatNumberToMoney(number) {
  if (number == null || number == undefined) return "0";
  else {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}
